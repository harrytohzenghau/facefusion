const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const AnimationJob = require("../models/AnimationJob");

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

  // New: Generate Expression Animation
  async generateExpression(req, res) {
    try {
      const { expression } = req.body;

      if (!req.file || !expression) {
        return res
          .status(400)
          .json({ message: "Face image and expression are required" });
      }

      const formData = new FormData();
      formData.append("face", fs.createReadStream(req.file.path));
      formData.append("expression", expression);

      const response = await axios.post(
        "http://20.205.137.58:8001/animate/",
        formData,
        {
          headers: formData.getHeaders(),
          responseType: "stream",
        }
      );

      const videoFileName = `video-${Date.now()}.mp4`;
      const videoPath = path.join(__dirname, "../uploads/", videoFileName);
      const writer = fs.createWriteStream(videoPath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        res.status(200).json({
          message: "Video generated successfully",
          videoUrl: `/uploads/${videoFileName}`,
        });
      });

      writer.on("error", (error) => {
        console.error("Error saving video file:", error);
        res.status(500).json({ error: "Failed to save video file" });
      });
    } catch (error) {
      console.error("Error generating expression animation:", error);
      res
        .status(500)
        .json({ error: "Failed to generate expression animation" });
    }
  },

  // New: Generate Lip Sync Animation
  async generateLipSync(req, res) {
    try {
      if (!req.files || !req.files.face || !req.files.audio) {
        return res
          .status(400)
          .json({ message: "Face video and audio file are required" });
      }

      const formData = new FormData();
      formData.append("face", fs.createReadStream(req.files.face[0].path));
      formData.append("audio", fs.createReadStream(req.files.audio[0].path));

      const response = await axios.post(
        "http://20.205.137.58:8000/generate/",
        formData,
        {
          headers: formData.getHeaders(),
          responseType: "stream",
        }
      );

      const videoFileName = `video-${Date.now()}.mp4`;
      const videoPath = path.join(__dirname, "../uploads/", videoFileName);
      const writer = fs.createWriteStream(videoPath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        res.status(200).json({
          message: "Video with lip sync generated successfully",
          videoUrl: `/uploads/${videoFileName}`,
        });
      });

      writer.on("error", (error) => {
        console.error("Error saving video file:", error);
        res.status(500).json({ error: "Failed to save video file" });
      });
    } catch (error) {
      console.error("Error generating lip sync animation:", error);
      res.status(500).json({ error: "Failed to generate lip sync animation" });
    }
  },

  // New: Text to Speech
  async textToSpeech(req, res) {
    try {
      const { message, gender } = req.body;
      if (!message || !gender) {
        return res
          .status(400)
          .json({ message: "Message text and gender are required" });
      }

      const formData = new FormData();
      formData.append("message", message);
      formData.append("gender", gender);

      const response = await axios.post(
        "http://20.205.137.58:8002/textToSpeech/",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error generating text to speech:", error);
      res.status(500).json({ error: "Failed to generate text to speech" });
    }
  },
};

module.exports = AnimationController;
