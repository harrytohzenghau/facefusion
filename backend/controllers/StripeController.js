const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const StripeController = {
  // create Checkout Session for payment or subscription
  async createCheckoutSession(req, res) {
    const { priceId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription', // or change to 'payment' for one-time payment
        line_items: [
          {
            price: priceId, // Stripe price ID for your product or subscription
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

  // handle Stripe Webhooks (Idk if yall need but its for )
  async handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout session here (e.g., update database)
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        break;
      case 'invoice.payment_failed':
        // Handle payment failure
        break;
      default:
        return res.status(400).end();
    }

    res.json({ received: true });
  },
};

module.exports = StripeController;
