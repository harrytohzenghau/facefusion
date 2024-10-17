const express = require("express");
const StripeController = require("../controllers/StripeController");
const router = express.Router();

router.post("/create-checkout-session", StripeController.createCheckoutSession);
router.post("/cancel-subscription", StripeController.cancelSubscription)

module.exports = router;
