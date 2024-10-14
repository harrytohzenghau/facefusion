const express = require('express');
const StripeController = require('../controllers/StripeController');
const router = express.Router();

// to create a Stripe Checkout session
router.post('/create-checkout-session', StripeController.createCheckoutSession);

// to handle Stripe webhook
router.post('/webhook', StripeController.handleWebhook);

module.exports = router;
