const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();

router.get('/users', AdminController.getUsers);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
