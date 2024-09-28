const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
  const { username, first_name, last_name, email, password, user_role_id } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      username,
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      password_salt: salt, // Optional: since bcrypt manages salt internally, you may choose to exclude this field
      user_role_id,
    });

    // Save user to the database
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all users without populating role details
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // No populate here
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all users with populated role details
router.get('/detailed', async (req, res) => {
  try {
    const users = await User.find().populate({
      path: 'user_role_id',
      model: 'UserRole',
      localField: 'user_role_id',
      foreignField: 'id',
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('user_role_id');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
