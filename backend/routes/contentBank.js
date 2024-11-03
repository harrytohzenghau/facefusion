const express = require('express');
const { upload, uploadToS3Middleware } = require('../middleware/uploadMiddleware');
const ContentBankController = require('../controllers/ContentBankController');
const { authenticateUser, authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);  // Token validation for all routes in this file
router.use(authenticateUser);     // Only admins can access these routes

// Route to get all content
router.get('/', ContentBankController.getAllContent);

// Route to create new content (upload file to S3 and check upload limit)
router.post('/createContent', upload.single('file'), uploadToS3Middleware, ContentBankController.createContent);

// Route to update Mongo DB
router.post('/updateContentBank', ContentBankController.updateContentBank);

// Route to get content by ID
router.get('/:id', ContentBankController.getContentById);

// Route to update content by ID
router.put('/:id', ContentBankController.updateContent);

// Route to delete content by ID
router.delete('/:id', ContentBankController.deleteContent);

router.post('/increment-download/:id', ContentBankController.incrementDownloadCount);


module.exports = router;
