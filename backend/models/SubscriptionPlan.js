const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model
const { Schema } = mongoose;

const subscriptionPlanSchema = new Schema({
  id: { type: Number, unique: true }, // Auto-incrementing ID
  user_id: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true }, // One-to-one relationship
  subscription_type: { type: String, enum: ['Free', 'Premium'], required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
});

// Pre-save hook to get the next incrementing ID
subscriptionPlanSchema.pre('save', async function (next) {
  if (!this.isNew) return next(); // Only execute if the document is new

  try {
    // Find and update the counter for the SubscriptionPlan model
    const counter = await Counter.findOneAndUpdate(
      { modelName: 'SubscriptionPlan' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // Create the counter document if it doesn't exist
    );

    this.id = counter.seq; // Set the incrementing ID
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
