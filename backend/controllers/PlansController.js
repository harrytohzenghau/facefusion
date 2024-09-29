const SubscriptionPlan = require('../models/SubscriptionPlan');

const PlansController = {

   // Get all subscription plans
   async getAllPlans(req, res) {
    try {
      const plans = await SubscriptionPlan.find().populate('user_id');
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a subscription plan by user ID
  async getPlanByUserId(req, res) {
    try {
      const plan = await SubscriptionPlan.findOne({ user_id: req.params.user_id });
      if (!plan) return res.status(404).json({ message: 'Subscription plan not found' });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new subscription plan
  async createPlan(req, res) {
    try {
      const plan = new SubscriptionPlan(req.body);
      await plan.save();
      res.status(201).json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a subscription plan by user ID
  async updatePlan(req, res) {
    try {
      const updatedPlan = await SubscriptionPlan.findOneAndUpdate({ user_id: req.params.user_id }, req.body, { new: true });
      res.json(updatedPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a subscription plan by user ID
  async deletePlan(req, res) {
    try {
      await SubscriptionPlan.findOneAndDelete({ user_id: req.params.user_id });
      res.json({ message: 'Subscription plan deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlansController;
