const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Assuming req.user is set after authentication
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user data to req object
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.user_role_id?.name === 'Admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin access required' });
};

module.exports = { authenticateUser, authorizeAdmin };