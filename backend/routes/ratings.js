const express = require('express');
const router = express.Router();
const Ratings = require('../models/Ratings');

// @route   GET /api/ratings
// @desc    Get all ratings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const ratings = await Ratings.find().populate('user_id');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
