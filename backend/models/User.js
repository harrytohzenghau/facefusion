const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  stripe_customer_id: { type: String },
  password_hash: { type: String, required: true },
  user_role_id: { type: Number, ref: "UserRole", required: true },
  pfp_s3_key: String,
  is_locked: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
