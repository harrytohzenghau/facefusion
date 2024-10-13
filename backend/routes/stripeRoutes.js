const express = require('express');
const StripeController = require('../controllers/StripeController');
const router = express.Router();

// Route to create a Stripe Checkout session
router.post('/create-checkout-session', StripeController.createCheckoutSession);

// Route to handle Stripe webhooks
router.post('/webhook', StripeController.handleWebhook);

module.exports = router;