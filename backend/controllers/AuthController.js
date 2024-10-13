const User = require("../models/User"); // Import User Entity (model)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getRoleById } = require("./UserRoleController");
const UserRole = require("../models/UserRole");

const AuthController = {
  // Login function
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }); // fetchUserByUsername()
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password_hash); // authenticateUser()
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const role = await UserRole.findOne({ id: user.user_role_id });
      
      const token = jwt.sign({ id: user._id, role: role.name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }); // setToken()

      const formattedUser = {
        id: user.id,
        role: role.name,
      };

      res.json({ token, formattedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Logout function (optional token invalidation logic can be implemented if needed)
  async logout(req, res) {
    try {
      // Here, you can handle token invalidation if using a token blacklist mechanism
      res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // register new user
  async register(req, res) {
    const { username, first_name, last_name, phone, email, password } = req.body;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        user_role_id: 3,
        username,
        first_name,
        last_name,
        email,
        phone,
        password_hash: hashedPassword,
      });

      await newUser.save(); // createUser()
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // delete user
  async deleteUser(req, res) {
    const userId = req.user.id; // Assuming `req.user` is set by authentication middleware

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      await User.findByIdAndDelete(userId); // deleteUserById()
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
