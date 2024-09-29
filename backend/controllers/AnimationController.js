
const path = require('path');
const fs = require('fs');


const AnimationController = {
    // Generate animation from portrait and text
    async generateAnimation(req, res) {
      const userId = req.user.id;
      const { portraitId, textId } = req.body;
  
      try {
        // Assuming this part interacts with an animation job entity/service
        const animationJob = {
          user_id: userId,
          portrait_id: portraitId,
          text_id: textId,
          job_type: 'FacialAnimation',
          created_at: new Date(),
        };
  
        // Simulate storing the job or sending it to some processing queue
        res.status(201).json({ message: 'Facial animation job submitted successfully', animationJob });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    // Download SD video
  async download(req, res) {
    const { videoId } = req.params; // The video ID is assumed to be passed as a URL parameter

    try {
      // Assuming you have a method to get the video path or URL from the database
      const videoPath = path.join(__dirname, '..', 'uploads', `${videoId}_sd.mp4`); // Example path
      if (fs.existsSync(videoPath)) {
        res.download(videoPath, `${videoId}_sd.mp4`); // Send the file for download
      } else {
        res.status(404).json({ error: 'SD video file not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // Submit animation job for premium user
  async submitJob(req, res) {
    try {
      const { portraitId, text, audioFile } = req.body; // Assuming this data comes from the front-end
      const userId = req.user.id; // Assuming user info is available in req.user via authentication middleware

      // Create a new animation job entry
      const animationJob = new AnimationJob({
        user_id: userId,
        portrait_id: portraitId,
        text,
        audio_file: audioFile,
        status: 'pending',
      });

      await animationJob.save();

      // Initiate the animation process (if it involves some job processor, trigger it here)
      res.status(201).json({ message: 'Animation job submitted successfully', jobId: animationJob._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Display animation video
  async showVideo(req, res) {
    try {
      const { videoId } = req.params;
      // Retrieve the video by ID
      const video = await AnimationJob.findById(videoId);
      if (!video) return res.status(404).json({ error: 'Video not found' });
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  };

  // Method to fetch all videos created by a premium user
AnimationController.getAllVideos = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user information is available in req.user
      const videos = await AnimationJob.find({ user_id: userId, status: 'completed' }); // Retrieve completed videos
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = AnimationController;
  