const User = require('../models/User'); // Import User Entity

const ProfileController = {
  // Update profile
  async updateProfile(req, res) {
    const { id } = req.user; // Assuming `id` is fetched from the authenticated user (middleware can be used)
    const { first_name, last_name, email, password } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (password) {
        user.password_hash = await bcrypt.hash(password, 10);
      }
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;

      await user.save(); // updateUserByUsername()
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Upgrade to premium plan
  async upgradeToPremium(req, res) {
    const userId = req.user.id; // Assuming `req.user` is set by authentication middleware
    try {
      let plan = await SubscriptionPlan.findOne({ user_id: userId });

      if (!plan) {
        plan = new SubscriptionPlan({
          user_id: userId,
          subscription_type: 'Premium',
          start_date: new Date(),
        });
      } else {
        plan.subscription_type = 'Premium';
        plan.start_date = new Date();
      }

      await plan.save(); // updateUserByUsername()
      res.status(200).json({ message: 'Successfully upgraded to premium plan' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

//   upload portrait
async uploadPortrait(req, res) {
  try {
    const userId = req.user.id;
    const portrait = new ContentBank({
      user_id: userId,
      name: req.file.originalname,
      file_type: 'Portrait',
      file_s3_key: `user/${req.file.s3Key}`, // This will be 'user/portraits/filename.jpg'
      created_at: new Date(),
      is_sample: false,
    });

    await portrait.save();
    res.status(201).json({ message: 'Portrait uploaded successfully', portrait });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

  // Submit text for synchronization
  async submitText(req, res) {
    const userId = req.user.id;
    const { text } = req.body;

    try {
      const job = {
        user_id: userId,
        text,
        job_type: 'LipSync',
        created_at: new Date(),
      };

      res.status(201).json({ message: 'Text submitted successfully for synchronization', job });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProfileController;
