const User = require("../models/User"); // Import User Entity (model)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const UserRole = require("../models/UserRole");
const SubscriptionPlan = require("../models/SubscriptionPlan");

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

      const token = jwt.sign(
        { id: user._id, role: role.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      ); // setToken()

      const formattedUser = {
        id: user.id,
        email: user.email,
        stripe_customer_id: user.stripe_customer_id,
        role: role.name,
        is_locked: user.is_locked,
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
    const { username, first_name, last_name, phone, email, password } =
      req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        user_role_id: 2,
        username,
        first_name,
        last_name,
        email,
        phone,
        password_hash: hashedPassword,
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
      await newUser.save(); // createUser()

      try {
        // Find the user by ID
        let user = await User.findOne({ username: username });

        const subscriptionPlan = new SubscriptionPlan({
          user_id: user._id,
          product_id: "",
          price_id: "",
          subscription_id: "",
          subscription_type: "Free",
          status: "Success",
          limit: 3,
          start_date: new Date(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        });

        await User.findByIdAndUpdate(
          user._id,
          { user_role_id: 2 },
          { new: true }
        );

        await subscriptionPlan.save();
        console.log(
          `Customer account for ${user._id} successfully created.`
        );
      } catch (error) {
        console.error("Error handling subscription success:", error);
      }

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
