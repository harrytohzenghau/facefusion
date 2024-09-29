const express = require('express');
const AnimationController = require('../controllers/AnimationController');
const router = express.Router();

// Assuming an authentication middleware is in place to get `req.user`
router.post('/generateAnimation', AnimationController.generateAnimation);
router.get('/download/:videoId', AnimationController.download);
router.post('/submitJob', AnimationController.submitJob);// Route to submit a new animation job
router.get('/showVideo/:videoId', AnimationController.showVideo);// Route to view generated animation video
router.get('/allVideos', AnimationController.getAllVideos); // Route to get all videos for the premium user



module.exports = router;
