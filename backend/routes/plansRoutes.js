const express = require('express');
const PlansController = require('../controllers/PlansController');
const router = express.Router();

// Routes
router.get('/', PlansController.getAllPlans);
router.get('/:user_id', PlansController.getPlanByUserId);
router.post('/', PlansController.createPlan);
router.put('/:user_id', PlansController.updatePlan);
router.delete('/:user_id', PlansController.deletePlan);

module.exports = router;
