const jwt = require('jsonwebtoken');
const User = require('../models/User');
const redisClient = require('../utils/redis');

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting a Bearer token in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(403).json({ message: 'Token is blacklisted.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user payload to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};


const authorizeAdmin = (req, res, next) => {
  if (req.user.role === 'Admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin access required' });
};

const authenticateUser = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming req.user is set after authentication

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { authenticateToken, authenticateUser, authorizeAdmin };
