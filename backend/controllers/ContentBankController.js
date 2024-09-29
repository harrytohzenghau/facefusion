const ContentBank = require('../models/ContentBank');

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
      res.json(contentItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new content
  async createContent(req, res) {
    try {
      const contentItem = new ContentBank(req.body);
      await contentItem.save();
      res.status(201).json(contentItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update content by ID
  async updateContent(req, res) {
    try {
      const updatedContent = await ContentBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete content by ID
  async deleteContent(req, res) {
    try {
      await ContentBank.findByIdAndDelete(req.params.id);
      res.json({ message: 'Content deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ContentBankController;
