const express = require('express');
const router = express.Router();
const UserRoleController = require('../controllers/UserRoleController');

// Routes
router.get('/', UserRoleController.getAllRoles);
router.get('/:id', UserRoleController.getRoleById);
router.post('/', UserRoleController.createRole);
router.put('/:id', UserRoleController.updateRole);
router.delete('/:id', UserRoleController.deleteRole);

module.exports = router;
