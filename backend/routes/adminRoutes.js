const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.use(authorizeAdmin); // for admin only

router.get('/users', AdminController.getUsers);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
