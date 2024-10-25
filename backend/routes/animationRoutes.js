const express = require('express');
const AnimationController = require('../controllers/AnimationController');
const ContentBankController = require('../controllers/ContentBankController');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { upload, uploadToS3Middleware } = require('../middleware/uploadMiddleware'); 
const { downloadFileFromS3, uploadFileToS3 } = require('../utils/s3Utils');
const { authenticateToken, authenticateUser } = require('../middleware/authMiddleware');
const FormData = require('form-data');

const fs = require('fs');
const axios = require('axios');



// Setup multer for file uploads
// router.use(authenticateUser);

router.post('/generateAnimation', AnimationController.generateAnimation);
router.get('/download/:videoId', AnimationController.download);
router.post('/submitJob', AnimationController.submitJob);
router.get('/showVideo/:videoId', AnimationController.showVideo);
router.get('/allVideos', AnimationController.getAllVideos);

// AI API
// Route to generate expression animation
router.post('/expression', upload.single('face'), AnimationController.generateExpression);

// Route to generate lip sync animation
router.post(
  '/lipSync',
  authenticateToken, // Ensure the user is authenticated
  upload.single('audio'), 
  AnimationController.generateLipSync
);

// Route for text-to-speech
router.post(
  '/textToSpeech',
  authenticateToken,  // This middleware should decode the token and set req.user
  AnimationController.textToSpeech
);

// An's
router.post('/upscaleVideo', upload.single('file'), AnimationController.upscaleVideo);

// upload image as file and generate
router.post(
    '/upload-image-expression',
    authenticateToken,
    upload.none(),
    // upload.single('image'), // This handles file upload
    // uploadToS3Middleware, // This handles the S3 upload
    async (req, res) => {
      try {
        console.log('File in req after S3 upload:', req);
  
        console.log(req.body)
        const { s3_url, expression, user_id } = req.body;

        console.log(s3_url)
        // const s3Key = req.file?.s3Key; // Get the S3 key
  
        if (!s3_url) {
          return res.status(400).json({ error: 'S3 key missing. File upload may have failed.' });
        }
  
        // Step 1: Download the image from S3
        const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3_url}`;
        const localFilePath = path.join(__dirname, '../uploads/', `image-${Date.now()}.jpg`); // Uses the 'path' module here
        const writer = fs.createWriteStream(localFilePath);
        const s3DownloadUrl = await downloadFileFromS3(s3Url); // Assuming you have this helper function
  
        const imageResponse = await axios.get(s3DownloadUrl, { responseType: 'stream' });
        imageResponse.data.pipe(writer);
  
        writer.on('finish', async () => {
          // Step 2: Prepare the data to send to the animation API
          const formData = new FormData();
          formData.append('face', fs.createReadStream(localFilePath));
          formData.append('expression', expression);
  
          try {
            // Step 3: Call the animation API
            const animationResponse = await axios.post(
              'http://20.205.137.58:8001/animate/', // Your animation API URL
              formData,
              { headers: formData.getHeaders(), responseType: 'stream' }
            );
  
            const videoFilePath = path.join(__dirname, '../uploads/', `video-${Date.now()}.mp4`);
            const videoWriter = fs.createWriteStream(videoFilePath);
            animationResponse.data.pipe(videoWriter);
  
            videoWriter.on('finish', async () => {
              // Step 4: Upload the generated video to S3
              const videoS3Key = `users/${user_id}/videos/${path.basename(videoFilePath)}`;
              await uploadFileToS3(videoFilePath, process.env.AWS_S3_BUCKET_NAME, videoS3Key);
  
              // Cleanup: Delete the local files
              fs.unlinkSync(localFilePath);
              fs.unlinkSync(videoFilePath);
  
              // Step 5: Respond to the client with the video URL
              res.status(200).json({
                message: 'Video generated and uploaded to S3 successfully',
                videoS3Url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${videoS3Key}`,
              });
            });
  
            videoWriter.on('error', (error) => {
              console.error('Error saving video file:', error);
              res.status(500).json({ error: 'Failed to save video file' });
            });
          } catch (animationError) {
            console.error('Error calling animation API:', animationError.response?.data || animationError.message);
            res.status(500).json({ error: 'Failed to call animation API' });
          }
        });
  
        writer.on('error', (error) => {
          console.error('Error downloading image from S3:', error);
          res.status(500).json({ error: 'Failed to download image from S3' });
        });
      } catch (error) {
        console.error('Error in uploading image and generating animation:', error);
        res.status(500).json({ error: 'Failed to process image and generate animation' });
      }
    }
  );
  

module.exports = router;
