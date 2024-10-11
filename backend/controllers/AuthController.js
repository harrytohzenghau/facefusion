const User = require('../models/User'); 
const SubscriptionPlan = require('../models/SubscriptionPlan'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
  // Login function
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // fetch subscription plan to include in the login response
      const subscriptionPlan = await SubscriptionPlan.findOne({ user_id: user._id });

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.user_role_id === 1 ? 'Admin' : 'User',
          subscription_type: subscriptionPlan ? subscriptionPlan.subscription_type : 'Free',
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // register new user
  async register(req, res) {
    const { username, first_name, last_name, email, password, user_role_id } = req.body;
    try {
      // check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        user_role_id: user_role_id || 2, // Default to 'User' role if not specified
      });

      await newUser.save();

      // assign a default subscription plan (Free)
      const subscriptionPlan = new SubscriptionPlan({
        user_id: newUser._id,
        subscription_type: 'Free',
        start_date: new Date(),
      });
      await subscriptionPlan.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // logout function
  async logout(req, res) {
    try {
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // delete user
  async deleteUser(req, res) {
    const userId = req.user.id;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
