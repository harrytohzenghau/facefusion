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
  // Add this to check if multer is working
  console.log('File received from multer:', req.file);

  if (!req.file) return next(); // If no file is found, skip

  try {
    const userId = req.user.id;
    const s3Key = `users/${userId}/${req.file.filename}`;

    // Simulate file upload to S3
    console.log('Uploading to S3 with key:', s3Key); // Debug log to ensure key is generated

    const s3Data = await uploadFileToS3(req.file.path, process.env.AWS_S3_BUCKET_NAME, s3Key);

    // Check if the upload succeeded
    console.log('S3 upload success, data:', s3Data);

    req.file.s3Key = s3Key; // Assign the s3Key to req.file for further processing

    // Optionally delete the local file after uploading to S3
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ error: 'Error uploading to S3' });
  }
};





module.exports = { upload, uploadToS3Middleware };
