const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User"); // need to update user or subscription data
const SubscriptionPlan = require("../models/SubscriptionPlan");

const StripeController = {
  // Checkout Session for payment or subscription
  async createCheckoutSession(req, res) {
    const { priceId, stripe_customer_id } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer: stripe_customer_id,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/user/success`,
        cancel_url: `${process.env.FRONTEND_URL}/user/plan`,
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async cancelSubscription(req, res) {
    const { subscriptionId } = req.body; // The subscription ID from Stripe

    try {
      const subscription = await stripe.subscriptions.cancel(subscriptionId);

      res.json({
        message: "Subscription canceled successfully",
        subscription,
      });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      res.status(500).json({ error: "Failed to cancel subscription" });
    }
  },

  // Handle Stripe Webhooks
  async handleWebhook(req, res) {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      // verify the webhook signature
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle different event types from Stripe
    switch (event.type) {
      case "invoice.payment_succeeded":
        const invoice = event.data.object;
        try {
          const customer = await stripe.customers.retrieve(invoice.customer);

          const userId = customer.metadata.userId;

          handleSubscriptionSuccess(
            userId,
            invoice.lines.data[0].plan.product,
            invoice.lines.data[0].plan.id,
            invoice.subscription
          );

          console.log(invoice.lines.data[0]);
          console.log(invoice.lines.data[0].plan.product);
          console.log(invoice.lines.data[0].plan.id);

          return res
            .status(200)
            .send(
              "Invoice payment succeeded and subscription updated successfully."
            );
        } catch (err) {
          console.error("Failed to retrieve customer:", err);
          return res
            .status(400)
            .send(`Error retrieving customer: ${err.message}`);
        }
        break;
      case "invoice.payment_failed":
        const failedInvoice = event.data.object;
        console.log(
          `Invoice ${failedInvoice.id} payment failed for subscription ${failedInvoice.subscription}`
        );
        try {
          const customer = await stripe.customers.retrieve(
            failedInvoice.customer
          );

          const userId = customer.metadata.userId;

          handleFailedSubscription(userId);
        } catch (err) {
          console.error("Failed to retrieve customer:", err);
          return res
            .status(400)
            .send(`Error retrieving customer: ${err.message}`);
        }
        // Handle failed payment
        break;
      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object;
        console.log(`Subscription deleted: ${subscriptionDeleted.id}`);
        // Handle subscription cancellation
        try {
          const customer = await stripe.customers.retrieve(
            subscriptionDeleted.customer
          );

          const userId = customer.metadata.userId;

          handleCancelSubscription(userId, subscriptionDeleted.id);
        } catch (err) {
          console.error("Failed to retrieve customer:", err);
          return res
            .status(400)
            .send(`Error retrieving customer: ${err.message}`);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Send a 200 response
    res.json({ received: true });
  },
};

// handle successful subscription
async function handleSubscriptionSuccess(
  userId,
  productId,
  priceId,
  subscriptionId
) {
  try {
    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // update or create a subscription plan for the user
    let subscriptionPlan = await SubscriptionPlan.findOne({ user_id: userId });
    if (!subscriptionPlan) {
      subscriptionPlan = new SubscriptionPlan({
        user_id: userId,
        product_id: productId,
        price_id: priceId,
        subscription_id: subscriptionId,
        subscription_type: "Premium",
        status: "Success",
        limit: 8,
        start_date: new Date(),
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      });
    } else {
      // update existing subscription
      subscriptionPlan.product_id = productId;
      subscriptionPlan.subscription_id = subscriptionId;
      subscriptionPlan.price_id = priceId;
      subscriptionPlan.subscription_type = "Premium";
      subscriptionPlan.limit = 8;
      subscriptionPlan.start_date = new Date();
      subscriptionPlan.end_date = new Date(new Date().setMonth(new Date().getMonth() + 1));
    }

    await subscriptionPlan.save();
    await User.findByIdAndUpdate(userId, { user_role_id: 3 }, { new: true });

    console.log(
      `Subscription plan for user ${userId} successfully updated/created.`
    );
  } catch (error) {
    console.error("Error handling subscription success:", error);
  }
}

async function handleFailedSubscription(userId) { }

async function handleCancelSubscription(userId, subscriptionId) {
  try {
    let user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    await SubscriptionPlan.findOneAndUpdate(
      { subscription_id: subscriptionId },
      {
        price_id: "",
        product_id: "",
        subscription_id: "",
        subscription_type: "Free",
        limit: 3,
        end_date: "",
      },
      { new: true }
    );

    await User.findByIdAndUpdate(userId, { user_role_id: 2 }, { new: true });

    console.log(`Subscription plan for user ${userId} successfully cancelled.`);
  } catch (error) {
    console.error("Error canceling subscription:", error);
  }
}

module.exports = StripeController;
