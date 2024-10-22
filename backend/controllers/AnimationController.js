const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const { parseS3Url, getSignedUrlForFullS3Url, uploadFileToS3, downloadFileFromS3  } = require('../utils/s3Utils');
const AnimationJob = require("../models/AnimationJob");

async function downloadS3File(s3Url, localFilePath) {
  const writer = fs.createWriteStream(localFilePath);
  const s3Stream = downloadFileFromS3(s3Url); // Function to download file from S3

  return new Promise((resolve, reject) => {
    s3Stream.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const downloadToFile = async (signedUrl, localFilePath) => {
  const writer = fs.createWriteStream(localFilePath);
  const response = await axios.get(signedUrl, { responseType: 'stream' });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const AnimationController = {
  // Generate animation from portrait and text (Existing Functionality)
  async generateAnimation(req, res) {
    const userId = req.user.id;
    const { portraitId, textId } = req.body;

    try {
      const animationJob = {
        user_id: userId,
        portrait_id: portraitId,
        text_id: textId,
        job_type: "FacialAnimation",
        created_at: new Date(),
      };

      // Simulate storing the job or sending it to some processing queue
      res.status(201).json({
        message: "Facial animation job submitted successfully",
        animationJob,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Download SD video (Existing Functionality)
  async download(req, res) {
    const { videoId } = req.params;

    try {
      const videoPath = path.join(
        __dirname,
        "..",
        "uploads",
        `${videoId}_sd.mp4`
      );
      if (fs.existsSync(videoPath)) {
        res.download(videoPath, `${videoId}_sd.mp4`);
      } else {
        res.status(404).json({ error: "SD video file not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Submit animation job for premium user (Existing Functionality)
  async submitJob(req, res) {
    try {
      const { portraitId, text, audioFile } = req.body;
      const userId = req.user.id;

      const animationJob = new AnimationJob({
        user_id: userId,
        portrait_id: portraitId,
        text,
        audio_file: audioFile,
        status: "pending",
      });

      await animationJob.save();
      res.status(201).json({
        message: "Animation job submitted successfully",
        jobId: animationJob._id,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Display animation video (Existing Functionality)
  async showVideo(req, res) {
    try {
      const { videoId } = req.params;
      const video = await AnimationJob.findById(videoId);
      if (!video) return res.status(404).json({ error: "Video not found" });
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fetch all videos created by a premium user (Existing Functionality)
  async getAllVideos(req, res) {
    try {
      const userId = req.user.id;
      const videos = await AnimationJob.find({
        user_id: userId,
        status: "completed",
      });
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  

  // generate Expression Animation and save to S3
  async generateExpression(req, res) {
    try {
      console.log("Request body:", req.body);
      const { s3_url, expression } = req.body;
  
      if (!s3_url || !expression) {
        return res.status(400).json({ message: 'S3 URL and expression are required' });
      }
  
      // Step 1: Download the image from S3
      const localFilePath = path.join(__dirname, '../uploads/', `image-${Date.now()}.jpg`);
      const s3DownloadUrl = await downloadFileFromS3(s3_url);
  
      const writer = fs.createWriteStream(localFilePath);
      const response = await axios.get(s3DownloadUrl, { responseType: 'stream' });
  
      response.data.pipe(writer);
  
      writer.on('finish', async () => {
        try {
          // Step 2: Prepare formData for the external animation API
          const formData = new FormData();
          formData.append('face', fs.createReadStream(localFilePath));
          formData.append('expression', expression);
  
          // Step 3: Call the external animation API
          const animationResponse = await axios.post(
            'http://20.205.137.58:8001/animate/',
            formData,
            { headers: formData.getHeaders(), responseType: 'stream' }
          );

          console.log('Animation API response:', animationResponse.status, animationResponse.headers);
  
          const videoFilePath = path.join(__dirname, '../uploads/', `video-${Date.now()}.mp4`);
          const videoWriter = fs.createWriteStream(videoFilePath);
  
          animationResponse.data.pipe(videoWriter);
  
          videoWriter.on('finish', async () => {
            try {
              // Upload the video to S3
              const s3Key = `users/${req.user._id}/videos/${path.basename(videoFilePath)}`;
              await uploadFileToS3(videoFilePath, process.env.AWS_S3_BUCKET_NAME, s3Key);
  
              // Clean up local files
              fs.unlinkSync(localFilePath);
              fs.unlinkSync(videoFilePath);
  
              // Send the response back to the user
              res.status(200).json({
                message: 'Video generated and uploaded to S3 successfully',
                s3Url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
              });
            } catch (error) {
              console.error('Error uploading video to S3:', error);
              res.status(500).json({ error: 'Failed to upload video to S3' });
            }
          });
  
          videoWriter.on('error', (error) => {
            console.error('Error writing video to local file:', error);
            res.status(500).json({ error: 'Failed to write video to local file' });
          });
  
        } catch (error) {
          console.error('Error processing animation response:', error);
          res.status(500).json({ error: 'Failed to process animation' });
        }
      });
  
      writer.on('error', (error) => {
        console.error('Error downloading image from S3:', error);
        res.status(500).json({ error: 'Failed to download image from S3' });
      });
    } catch (error) {
      console.error('Error generating expression animation:', error);
      res.status(500).json({ error: 'Failed to generate expression animation' });
    }
  }
  ,

  // New: Generate Lip Sync Animation and save to S3
  async generateLipSync(req, res) {
    try {
      const { face, audio } = req.body; // S3 URLs for face video and audio
  
      if (!face || !audio) {
        return res.status(400).json({ message: "Face video and audio file URLs are required" });
      }
  
      // Download the face and audio files from S3 to temporary local storage
      const faceSignedUrl = await downloadFileFromS3(face);
      const audioSignedUrl = await downloadFileFromS3(audio);
  
      // Download the actual files
      const faceFilePath = path.join(__dirname, '../uploads/', `face-${Date.now()}.mp4`);
      const audioFilePath = path.join(__dirname, '../uploads/', `audio-${Date.now()}.mp3`);
  
      await downloadToFile(faceSignedUrl, faceFilePath);
      await downloadToFile(audioSignedUrl, audioFilePath);
  
      // Prepare formData for the external API
      const formData = new FormData();
      formData.append("face", fs.createReadStream(faceFilePath));  // Attach the downloaded file
      formData.append("audio", fs.createReadStream(audioFilePath));  // Attach the downloaded file
  
      // Step 3: Call the lip-sync API
      const response = await axios.post(
        "http://20.205.137.58:8000/generate/",
        formData,
        { headers: formData.getHeaders(), responseType: "stream" }
      );
  
      const lipSyncVideoPath = path.join(__dirname, '../uploads/', `lip-sync-${Date.now()}.mp4`);
      const writer = fs.createWriteStream(lipSyncVideoPath);
  
      // Pipe the response stream to the local file
      response.data.pipe(writer);
  
      writer.on("finish", async () => {
        // Upload lip-sync video to S3
        const s3Key = `users/${req.user._id}/videos/${path.basename(lipSyncVideoPath)}`;
        await uploadFileToS3(lipSyncVideoPath, process.env.AWS_S3_BUCKET_NAME, s3Key);
  
        // Delete the local files
        fs.unlinkSync(lipSyncVideoPath);
        fs.unlinkSync(faceFilePath);  // Clean up the face file
        fs.unlinkSync(audioFilePath);  // Clean up the audio file
  
        res.status(200).json({
          message: "Lip-sync video generated and uploaded to S3 successfully",
          lipSyncVideoUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
        });
      });
  
      writer.on("error", (error) => {
        console.error("Error saving lip-sync video file:", error);
        res.status(500).json({ error: "Failed to save lip-sync video file" });
      });
    } catch (error) {
      console.error("Error generating lip-sync animation:", error);
      res.status(500).json({ error: "Failed to generate lip-sync animation" });
    }
  },
  

  // New: Text to Speech and save to S3
  async textToSpeech(req, res) {
    try {
      const { message, gender } = req.body;
      if (!message || !gender) {
        return res.status(400).json({ message: "Message text and gender are required" });
      }

      const formData = new FormData();
      formData.append("message", message);
      formData.append("gender", gender);

      const response = await axios.post(
        "http://20.205.137.58:8002/textToSpeech/",
        formData,
        {
          headers: formData.getHeaders(),
          responseType: 'arraybuffer'
        }
      );

      const audioFileName = `audio-${Date.now()}.mp3`;
      const localFilePath = path.join(__dirname, '../uploads/', audioFileName);
      fs.writeFileSync(localFilePath, Buffer.from(response.data));

      // Upload the generated audio to S3
      console.log(req)
      const s3Key = `users/${req.user._id}/audio/${audioFileName}`;
      await uploadFileToS3(localFilePath, process.env.AWS_S3_BUCKET_NAME, s3Key);
  
      // Delete the local file after upload
      fs.unlinkSync(localFilePath);
  
      // Send response back to the client with the S3 URL
      res.status(200).json({
        message: "Text to speech generated and uploaded to S3 successfully",
        s3Url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
      });
    } catch (error) {
      console.error("Error generating text to speech:", error);
      res.status(500).json({ error: "Failed to generate text to speech" });
    }
  },

  async upscaleVideo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Video file is required" });
      }

      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      // Send the request to the upscaling API
      const response = await axios.post(
        "https://c8db-138-75-118-40.ngrok-free.app/make-hd",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'ngrok-skip-browser-warning': 'true',
          },
          responseType: "stream",
        }
      );

      const localFilePath = path.join(__dirname, '../uploads/', `video-hd-${Date.now()}.mp4`);
      const writer = fs.createWriteStream(localFilePath);

      // Pipe the response (video) to local storage
      response.data.pipe(writer);

      writer.on("finish", async () => {
        // Upload the upscaled video to S3
        const s3Key = `user/${req.user._id}/videos/${path.basename(localFilePath)}`;
        await uploadFileToS3(localFilePath, process.env.AWS_S3_BUCKET_NAME, s3Key);

        // Delete the local file after uploading to S3
        fs.unlinkSync(localFilePath);

        res.status(200).json({
          message: "HD video generated and uploaded to S3 successfully",
          s3Url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
        });
      });

      writer.on("error", (error) => {
        console.error("Error saving video file:", error);
        res.status(500).json({ error: "Failed to save video file" });
      });
    } catch (error) {
      console.error("Error upscaling video:", error);
      res.status(500).json({ error: "Failed to upscale video" });
    }
  },
};

module.exports = AnimationController;
