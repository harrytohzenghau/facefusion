const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    try {
      console.log('Decoded token:', decoded); // Log decoded token

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      req.user = user; // Attach user to req object
      console.log('User attached to req:', req.user);
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};


// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
  // Assuming user_role_id is an object or a string representing the role
  if (req.user && req.user.user_role_id && req.user.user_role_id.name === 'Admin') {
    return next(); // Admin access allowed
  }
  return res.status(403).json({ message: 'Forbidden: Admin access required' });
};

const authenticateUser = (req, res, next) => {
  if (req.user) {
    return next(); // Proceed if user is authenticated
  }
  return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
};

module.exports = { authenticateToken, authenticateUser, authorizeAdmin };
