const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");

const UserController = {
  // Get all users (Admin Only)
  async getAllUsers(req, res) {
    try {
      // Check if the user is an admin
      if (req.user.user_role_id?.name !== "Admin") {
        return res
          .status(403)
          .json({ message: "Forbidden: Admin access required" });
      }

      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a user by ID
  async getUserById(req, res) {
    try {
      // Allow users to access only their own profile, admins can access any profile
      if (
        req.user.id !== req.params.id &&
        req.user.user_role_id?.name !== "Admin"
      ) {
        return res.status(403).json({
          message: "Forbidden: Access restricted to your own profile",
        });
      }

      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a user (Admin Only)
  async createUser(req, res) {
    try {
      // Check if the user is an admin
      if (req.user.user_role_id?.name !== "Admin") {
        return res
          .status(403)
          .json({ message: "Forbidden: Admin access required" });
      }

      const { username, first_name, last_name, email, password, user_role_id } =
        req.body;
      const user = new User({
        username,
        first_name,
        last_name,
        email,
        password,
        user_role_id,
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update user by ID
  async updateUser(req, res) {
    try {
      // Allow users to update only their own profile, admins can update any profile
      if (
        req.user.id !== req.params.id &&
        req.user.user_role_id?.name !== "Admin"
      ) {
        return res.status(403).json({
          message: "Forbidden: Access restricted to your own profile",
        });
      }

      if (req.body.password) {
        req.body.password_hash = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      // Allow users to delete only their own profile, admins can delete any profile
      if (
        req.user.id !== req.params.id &&
        req.user.user_role_id?.name !== "Admin"
      ) {
        return res.status(403).json({
          message: "Forbidden: Access restricted to your own profile",
        });
      }

      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
