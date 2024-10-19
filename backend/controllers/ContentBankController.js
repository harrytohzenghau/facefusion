const ContentBank = require('../models/ContentBank');
const { downloadFileFromS3, deleteFileFromS3, getSignedUrlForS3  } = require('../utils/s3Utils');

const ContentBankController = {
  // Get all content items
  async getAllContent(req, res) {
    try {
      const content = await ContentBank.find();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get content by ID
  async getContentById(req, res) {
    try {
      const contentItem = await ContentBank.findById(req.params.id);
      if (!contentItem) return res.status(404).json({ message: 'Content not found' });

      // Generate a pre-signed URL
      const fileKey = contentItem.file_s3_key;
      const signedUrl = await getSignedUrlForS3(process.env.AWS_S3_BUCKET_NAME, fileKey);

      res.json({ content: contentItem, fileUrl: signedUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  },

  // Create new content
  async createContent(req, res) {
    try {
      const { name, user_id, file_type } = req.body;
  
      // Validate required fields
      if (!name || !user_id || !file_type || !req.file) {
        return res.status(400).json({ error: 'Missing required fields or file' });
      }
  
      const newContent = new ContentBank({
        name,
        user_id,
        file_type,
        file_s3_key: `${req.file.s3Key}`, // S3 key for the uploaded file
        created_at: new Date(),
        is_sample: false
      });
  
      await newContent.save();
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update content by ID
  async updateContent(req, res) {
    try {
      const content = await ContentBank.findById(req.params.id);
      if (!content) return res.status(404).json({ message: 'Content not found' });

      // If a new file is uploaded, handle S3 upload
      if (req.file) {
        const newS3Key = `contentBank/${req.file.filename}`;
        await uploadFileToS3(req.file.path, process.env.AWS_S3_BUCKET_NAME, `${newS3Key}`);
        content.file_s3_key = `${newS3Key}`;
        content.name = req.file.originalname;
      }

      // Update other fields
      if (req.body.name) content.name = req.body.name;
      if (req.body.file_type) content.file_type = req.body.file_type;
      if (req.body.is_sample !== undefined) content.is_sample = req.body.is_sample;

      await content.save();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // Delete content by ID
  async deleteContent(req, res) {
    try {
      const content = await ContentBank.findById(req.params.id);
      if (!content) return res.status(404).json({ message: 'Content not found' });
  
      // Delete the file from S3
      await deleteFileFromS3(process.env.AWS_S3_BUCKET_NAME, content.file_s3_key);
  
      // Delete the database record
      await content.remove();
      
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async downloadContent(req, res) {
    try {
      const { id } = req.params;
      const content = await ContentBank.findById(id);
      if (!content) return res.status(404).json({ message: 'Content not found' });
  
      // Download the file from S3
      const s3Stream = downloadFileFromS3(process.env.AWS_S3_BUCKET_NAME, content.file_s3_key);
  
      res.attachment(content.name); // Set the download name for the file
      s3Stream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,
};

module.exports = ContentBankController;
