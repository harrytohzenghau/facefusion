const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" }, // Many-to-one relationship
  name: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  occupation: { type: String },
  company_name: { type: String },
  feedback: { type: String },
  is_published: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ratings", ratingsSchema);
