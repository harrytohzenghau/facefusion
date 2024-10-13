const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();
const { authenticateUser, authorizeAdmin, authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);
// router.use(authenticateUser);
router.use(authorizeAdmin); // for admin only

router.get('/users', AdminController.getUsers);
router.get('/users/:id', AdminController.getOneUser);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
