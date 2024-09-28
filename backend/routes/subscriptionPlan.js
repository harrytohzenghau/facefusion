const express = require('express');
const router = express.Router();
const SubscriptionPlan = require('../models/SubscriptionPlan');

// @route   GET /api/subscriptionPlans
// @desc    Get all subscription plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().populate('user_id');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
