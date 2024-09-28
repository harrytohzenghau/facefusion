const express = require('express');
const router = express.Router();
const UserRole = require('../models/UserRole');

// @route   GET /api/userRoles
// @desc    Get all user roles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const roles = await UserRole.find();
    res.json(roles);
  } catch (err) {
    console.error("Error fetching user roles:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/userRoles/:id
// @desc    Get a user role by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Check if the provided id is a valid ObjectId
    if (!req.params.id.match(/^[0-9]+$/)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const role = await UserRole.findOne({ id: req.params.id });
    if (!role) return res.status(404).json({ msg: 'User role not found' });

    res.json(role);
  } catch (err) {
    console.error("Error fetching user role by ID:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/userRoles
// @desc    Create a new user role
// @access  Public
router.post('/', async (req, res) => {
  const { id, name } = req.body;

  try {
    // Check if all required fields are provided
    if (!id || !name) {
      return res.status(400).json({ msg: 'Please provide both id and name' });
    }

    // Check if role with the same id or name already exists
    const existingRole = await UserRole.findOne({ $or: [{ id }, { name }] });
    if (existingRole) {
      return res.status(400).json({ msg: 'Role with the same ID or name already exists' });
    }

    const role = new UserRole({ id, name });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    console.error("Error creating user role:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/userRoles/:id
// @desc    Update a user role by ID
// @access  Public
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the provided id is a valid ObjectId
    if (!req.params.id.match(/^[0-9]+$/)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Check if the role exists
    const existingRole = await UserRole.findOne({ id: req.params.id });
    if (!existingRole) {
      return res.status(404).json({ msg: 'User role not found' });
    }

    // Update the role
    existingRole.name = name || existingRole.name;
    await existingRole.save();
    
    res.json(existingRole);
  } catch (err) {
    console.error("Error updating user role:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/userRoles/:id
// @desc    Delete a user role by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    // Check if the provided id is a valid ObjectId
    if (!req.params.id.match(/^[0-9]+$/)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Check if the role exists
    const role = await UserRole.findOneAndDelete({ id: req.params.id });
    if (!role) return res.status(404).json({ msg: 'User role not found' });

    res.json({ msg: 'User role deleted' });
  } catch (err) {
    console.error("Error deleting user role:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
