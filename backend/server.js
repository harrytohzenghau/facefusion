const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes')); // Auth routes for login and registration
app.use('/api/samples', require('./routes/samplesRoutes')); // Guest viewing samples
app.use('/api/plans', require('./routes/plansRoutes')); // Viewing subscription plans
app.use('/api/profile', require('./routes/profileRoutes')); // Updated with profile-related actions
app.use('/api/animation', require('./routes/animationRoutes')); // For generating animations
app.use('/api/ratings', require('./routes/ratingsRoutes')); // Route for handling ratings
app.use('/api/users', require('./routes/users'));
app.use('/api/userRoles', require('./routes/userRoles'));
app.use('/api/contentBank', require('./routes/contentBank'));



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
