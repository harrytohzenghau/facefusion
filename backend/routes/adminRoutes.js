const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.use(authenticateToken);  // Token validation for all routes in this file
router.use(authorizeAdmin);     // Only admins can access these routes

router.get('/users', AdminController.getUsers);
router.get('/users/:id', AdminController.getOneUser);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
