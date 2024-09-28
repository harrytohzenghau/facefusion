const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/userRoles', require('./routes/userRoles'));
app.use('/api/contentBank', require('./routes/contentBank'));
app.use('/api/subscriptionPlans', require('./routes/subscriptionPlan'));
app.use('/api/ratings', require('./routes/ratings'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
