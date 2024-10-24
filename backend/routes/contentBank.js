const express = require('express');
const { upload, uploadToS3Middleware } = require('../middleware/uploadMiddleware');
const ContentBankController = require('../controllers/ContentBankController');

const router = express.Router();

// Route to get all content
router.get('/', ContentBankController.getAllContent);

// Route to create new content (upload file to S3 and check upload limit)
router.post('/createContent', upload.single('file'), uploadToS3Middleware, ContentBankController.createContent);

// Route to get content by ID
router.get('/:id', ContentBankController.getContentById);

// Route to get content by User ID
router.get('/content/user/:user_id', ContentBankController.getContentByUserId);

// Route to update content by ID
router.put('/:id', ContentBankController.updateContent);

// Route to delete content by ID
router.delete('/:id', ContentBankController.deleteContent);

module.exports = router;
