const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const router = express.Router();
const { upload, uploadToS3Middleware } = require('../middleware/uploadMiddleware');

router.put('/profile', ProfileController.updateProfile);
router.put('/upgrade', ProfileController.upgradeToPremium);
router.post('/uploadPortrait', upload.single('portrait'), uploadToS3Middleware, ProfileController.uploadPortrait);
router.post('/submitText', ProfileController.submitText);


module.exports = router;
