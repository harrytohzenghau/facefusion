const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User"); // Import User Entity
const SubscriptionPlan = require("../models/SubscriptionPlan");

const AdminController = {
  async getUsers(req, res) {
    try {
      const users = await User.find(); // fetchAllUsers()
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOneUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    const {
      username,
      first_name,
      last_name,
      email,
      phone,
      password,
      user_role_id,
    } = req.body;

    try {
      // Check if a user with the same username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Username or email already exists.",
        });
      }

      // If no user exists, proceed with creating the new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        first_name,
        last_name,
        email,
        phone,
        password_hash: hashedPassword,
        user_role_id,
      });

      const stripeCustomer = await stripe.customers.create({
        email: newUser.email,
        name: `${newUser.first_name} ${newUser.last_name}`,
        phone: newUser.phone,
        metadata: {
          userId: newUser._id.toString(), // Store the MongoDB user ID as metadata
        },
      });
      
      newUser.stripe_customer_id = stripeCustomer.id;
      await newUser.save(); // Create new user

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a user's profile
  async updateUser(req, res) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      is_locked,
      user_role_id,
    } = req.body;

    try {
      const user = await User.findById(id); // updateUser()
      if (!user) return res.status(404).json({ message: "User not found" });

      if (password) {
        user.password_hash = await bcrypt.hash(password, 10);
      }
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.is_locked = is_locked;
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
      await SubscriptionPlan.findOneAndDelete({ user_id: id });
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AdminController;
