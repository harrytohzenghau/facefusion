const ContentBank = require("../models/ContentBank");
const {
  downloadFileFromS3,
  deleteFileFromS3,
  getSignedUrlForS3,
} = require("../utils/s3Utils");

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
      const contentItem = await ContentBank.find({ user_id: req.params.id });

      if (!contentItem)
        return res.status(404).json({ message: "Content not found" });

      let fileUrl = [];

      for (let i = 0; i < contentItem.length; i++) {
        // Generate a pre-signed URL
        const fileKey = contentItem[i].file_s3_key;
        const signedUrl = await getSignedUrlForS3(
          process.env.AWS_S3_BUCKET_NAME,
          fileKey
        );

        fileUrl.push(signedUrl);
      }

      res.json({ content: contentItem, fileUrl: fileUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new content
  async createContent(req, res) {
    try {
      const { name, user_id, file_type } = req.body;
      const s3Key = req.file?.s3Key; // get the S3 key from req.file.s3Key

      if (!name || !user_id || !file_type || !s3Key) {
        return res
          .status(400)
          .json({ message: "Missing required fields or file" });
      }

      const newContent = new ContentBank({
        name,
        user_id,
        file_type,
        file_s3_key: s3Key,
        status: req.body.status || "uploaded",
        created_at: new Date(),
        is_sample: false,
      });

      await newContent.save();

      return res
        .status(201)
        .json({ message: "Content created successfully", content: newContent });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating content", error: error.message });
    }
  },

  // use only to update db
  async updateContentBank(req, res) {
    try {
      const { name, file_type, file_s3_key, status } = req.body;
      const user_id =req.user.id;

      file_s3_key = file_s3_key
      
  
      // Check for required fields
      if (!name || !file_type) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Create a new content entry in MongoDB
      const newContent = new ContentBank({
        name,
        user_id,
        file_type,
        file_s3_key: file_s3_key || null,  // Set to provided file_s3_key or null if not provided
        status: status || "uploaded",
        created_at: new Date(),
        is_sample: false,
      });
  
      await newContent.save();
  
      return res.status(201).json({
        message: "Content updated successfully",
        content: newContent,
      });
    } catch (error) {
      console.error("Error updating content:", error.message);
      return res.status(500).json({
        message: "Error updating content",
        error: error.message,
      });
    }
  },

  // Update content by ID
  async updateContent(req, res) {
    try {
      const content = await ContentBank.findById(req.params.id);
      if (!content)
        return res.status(404).json({ message: "Content not found" });

      // If a new file is uploaded, handle S3 upload
      if (req.file) {
        const newS3Key = `contentBank/${req.file.filename}`;
        await uploadFileToS3(
          req.file.path,
          process.env.AWS_S3_BUCKET_NAME,
          `${newS3Key}`
        );
        content.file_s3_key = `${newS3Key}`;
        content.name = req.file.originalname;
      }

      // Update other fields
      if (req.body.name) content.name = req.body.name;
      if (req.body.file_type) content.file_type = req.body.file_type;
      if (req.body.is_sample !== undefined)
        content.is_sample = req.body.is_sample;

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
      if (!content)
        return res.status(404).json({ message: "Content not found" });

      // Delete the file from S3
      await deleteFileFromS3(
        process.env.AWS_S3_BUCKET_NAME,
        content.file_s3_key
      );

      // Delete the database record
      await ContentBank.findByIdAndDelete(req.params.id); // removeUserById()

      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async downloadContent(req, res) {
    try {
      const { id } = req.params;
      const content = await ContentBank.findById(id);
      if (!content)
        return res.status(404).json({ message: "Content not found" });

      // Download the file from S3
      const s3Stream = downloadFileFromS3(
        process.env.AWS_S3_BUCKET_NAME,
        content.file_s3_key
      );

      res.attachment(content.name); // Set the download name for the file
      s3Stream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ContentBankController;
