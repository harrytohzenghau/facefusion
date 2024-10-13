// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const { uploadFileToS3, downloadFileFromS3, deleteFileFromS3 } = require('../utils/s3Utils');
const fs = require('fs');

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

const uploadToS3Middleware = (req, res, next) => {
  if (!req.file) return next();

  let s3Subfolder = '';
  if (req.path.includes('uploadPortrait')) {
    s3Subfolder = 'portraits';
  } else if (req.path.includes('contentBank')) {
    s3Subfolder = 'contentBank';
  }

  const s3Key = `${s3Subfolder}/${req.file.filename}`;

  uploadFileToS3(req.file.path, process.env.AWS_S3_BUCKET_NAME, `user/${s3Key}`)
  .then((s3Data) => {
    req.file.s3Location = s3Data.Location; // Store the S3 file location
    req.file.s3Key = s3Key;               // Store the S3 key for retrieval
    
    // Delete the file from local storage
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    next();
  })
  .catch((error) => {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ error: 'Error uploading to S3' });
  });
};

module.exports = { upload, uploadToS3Middleware };
