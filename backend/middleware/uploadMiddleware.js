const multer = require('multer');
const path = require('path');
const { uploadFileToS3 } = require('../utils/s3Utils');
const fs = require('fs');
const SubscriptionPlan = require('../models/SubscriptionPlan');

// Define the storage and file naming logic for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Temporary local storage, ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

// Initialize multer
const upload = multer({ storage: storage });

// Define upload limits based on plan type
const uploadLimits = {
  free: { images: 3, videos: 3 },
  premium: { images: 1000, videos: 1000 }
};

// Middleware to check upload limits and upload to S3
const uploadToS3Middleware = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Get user_id from the request (can be from req.body, req.params, or elsewhere)
    const userId = req.body.user_id || req.params.user_id; // Adjust as needed
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch user's subscription plan from the database
    const subscription = await SubscriptionPlan.findOne({ user_id: userId });
    if (!subscription) {
      return res.status(403).json({ error: 'No subscription plan found for the user' });
    }

    const userPlan = subscription.subscription_type.toLowerCase(); // 'free' or 'premium'

    // Determine if the file is an image or a video
    const fileType = req.file.mimetype.startsWith('image') ? 'images' : 'videos';

    // Get the current upload count from the subscription
    const currentUploads = {
      images: subscription.image_uploads || 0,
      videos: subscription.video_uploads || 0,
    };

    // Check if the user has exceeded their upload limit
    if (currentUploads[fileType] >= uploadLimits[userPlan][fileType]) {
      return res.status(403).json({
        error: `You have reached the ${fileType} upload limit for your ${userPlan} plan (${uploadLimits[userPlan][fileType]} ${fileType} allowed)`
      });
    }

    // Define the S3 path using the user ID
    const s3Key = `users/${userId}/${req.file.filename}`;

    // Upload the file to S3
    const s3Data = await uploadFileToS3(req.file.path, process.env.AWS_S3_BUCKET_NAME, s3Key);
    
    // Store S3 file location and key in the request for further processing
    req.file.s3Location = s3Data.Location;
    req.file.s3Key = s3Key;

    // Delete the local file after uploading to S3
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    // Increment the upload count in the user's subscription plan
    if (fileType === 'images') {
      subscription.image_uploads += 1;
    } else {
      subscription.video_uploads += 1;
    }
    await subscription.save(); // Save the updated upload count

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ error: 'Error uploading to S3' });
  }
};

module.exports = { upload, uploadToS3Middleware };
