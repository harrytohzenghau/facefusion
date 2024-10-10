const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const UserRole = require('./models/UserRole'); // Import the UserRole model

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Seeds(This one to add all the roles on startup)
const seedRoles = async () => {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Guest' },
    { id: 3, name: 'Free' },
    { id: 4, name: 'Premium' }
  ];

  try {
    const existingRoles = await UserRole.find();
    if (existingRoles.length === 0) {
      await UserRole.insertMany(roles);
      console.log('Roles seeded successfully');
    } else {
      console.log('Roles already exist, skipping seeding');
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};

// Call the seedRoles function after connecting to the database
seedRoles();

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
