const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionPlanSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', unique: true }, // One-to-one relationship
    subscription_type: { type: String, enum: ['Free', 'Premium'], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
  });
  
  module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
  