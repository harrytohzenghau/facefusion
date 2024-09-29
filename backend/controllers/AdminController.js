const User = require('../models/User'); // Import User Entity

const AdminController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find(); // fetchAllUsers()
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new user
  async createUser(req, res) {
    const { username, first_name, last_name, email, password, user_role_id } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, first_name, last_name, email, password_hash: hashedPassword, user_role_id });
      await newUser.save(); // createUser()
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a user's profile
  async updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, password, user_role_id } = req.body;
    try {
      const user = await User.findById(id); // updateUser()
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (password) {
        user.password_hash = await bcrypt.hash(password, 10);
      }
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      user.user_role_id = user_role_id || user.user_role_id;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id); // removeUserById()
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AdminController;
