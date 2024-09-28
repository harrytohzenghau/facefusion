const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Many-to-one relationship
    rating: { type: Number, min: 1, max: 5, required: true },
    occupation: { type: String },
    feedback: { type: String },
    created_at: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Ratings', ratingsSchema);
