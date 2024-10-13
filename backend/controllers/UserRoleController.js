const UserRole = require('../models/UserRole');

const UserRoleController = {
  // Get all user roles
  async getAllRoles(req, res) {
    try {
      const roles = await UserRole.find();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a user role by ID
  async getRoleById(req, res) {
    try {
      const role = await UserRole.findOne({ id: req.params.id });
      if (!role) return res.status(404).json({ message: 'User role not found' });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new user role
  async createRole(req, res) {
    try {
      const { id, name } = req.body;
      const role = new UserRole({ id, name });
      await role.save();
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a user role by ID
  async updateRole(req, res) {
    try {
      const updatedRole = await UserRole.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
      if (!updatedRole) return res.status(404).json({ message: 'User role not found' });
      res.json(updatedRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a user role by ID
  async deleteRole(req, res) {
    try {
      await UserRole.findOneAndDelete({ id: req.params.id });
      res.json({ message: 'User role deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserRoleController;
