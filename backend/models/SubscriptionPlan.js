const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionPlanSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  product_id: {
    type: String,
  },
  price_id: {
    type: String,
  },
  subscription_id: { 
    type: String,
  },
  subscription_type: {
    type: String,
    enum: ["Free", "Premium"],
    required: true,
  },
  limit: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Success", "Failed"],
  },
  start_date: { 
    type: Date, 
    required: true 
  },
  end_date: { 
    type: Date 
  },
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
