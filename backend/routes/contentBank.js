const express = require('express');
const router = express.Router();
const ContentBank = require('../models/ContentBank');

// @route   GET /api/contentBank
// @desc    Get all content items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const content = await ContentBank.find().populate('user_id');
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create content
router.post('/', async (req, res) => {
  try {
    const content = new ContentBank(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await ContentBank.findById(req.params.id).populate('user_id');
    if (!content) return res.status(404).json({ msg: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update content
router.put('/:id', async (req, res) => {
  try {
    const updatedContent = await ContentBank.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete content
router.delete('/:id', async (req, res) => {
  try {
    await ContentBank.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
