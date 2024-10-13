const express = require('express');
const AnimationController = require('../controllers/AnimationController');
const router = express.Router();
const multer = require('multer');

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/generateAnimation', AnimationController.generateAnimation);
router.get('/download/:videoId', AnimationController.download);
router.post('/submitJob', AnimationController.submitJob);
router.get('/showVideo/:videoId', AnimationController.showVideo);
router.get('/allVideos', AnimationController.getAllVideos);

// AI API
// Route to generate expression animation
router.post('/expression', upload.single('face'), AnimationController.generateExpression);

// Route to generate lip sync animation
router.post('/lipSync', upload.fields([{ name: 'face' }, { name: 'audio' }]), AnimationController.generateLipSync);

// Route for text-to-speech
router.post('/textToSpeech', AnimationController.textToSpeech);

module.exports = router;
