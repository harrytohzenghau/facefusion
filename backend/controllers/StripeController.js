const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');  // need to update user or subscription data
const SubscriptionPlan = require('../models/SubscriptionPlan'); 

const StripeController = {
  // Checkout Session for payment or subscription
  async createCheckoutSession(req, res) {
    const { priceId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription', // ot change to 'payment' for one-time payment
        line_items: [
          {
            price: priceId, // Stripe price ID
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Handle Stripe Webhooks
  async handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // verify the webhook signature
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle different event types from Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Handle successful checkout session (e.g., create/update user subscription)
        const userId = session.client_reference_id; 
        const priceId = session.display_items[0].price.id; // Price ID of the subscription
        await handleSubscriptionSuccess(userId, priceId);

        break;
      }
      case 'invoice.payment_succeeded': {
        // Payment was successful, update subscription status if needed
        const invoice = event.data.object;
        console.log(`Payment succeeded for invoice: ${invoice.id}`);
        // can update subscription or invoice status here

        break;
      }
      case 'invoice.payment_failed': {
        // Payment failed, notify the user or take necessary action
        const invoice = event.data.object;
        console.log(`Payment failed for invoice: ${invoice.id}`);
        // You could update payment status here

        break;
      }
      default:
        // Unexpected event type
        return res.status(400).end();
    }

    // Send a 200 response
    res.json({ received: true });
  },
};

// handle successful subscription
async function handleSubscriptionSuccess(userId, priceId) {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // update or create a subscription plan for the user
    let subscriptionPlan = await SubscriptionPlan.findOne({ user_id: userId });
    if (!subscriptionPlan) {
      subscriptionPlan = new SubscriptionPlan({
        user_id: userId,
        subscription_type: 'Premium',
        start_date: new Date(),
        price_id: priceId, // store the Stripe price ID
      });
    } else {
      // update existing subscription
      subscriptionPlan.subscription_type = 'Premium';
      subscriptionPlan.price_id = priceId;
    }

    await subscriptionPlan.save();
    console.log(`Subscription plan for user ${userId} successfully updated/created.`);
  } catch (error) {
    console.error('Error handling subscription success:', error);
  }
}

module.exports = StripeController;
