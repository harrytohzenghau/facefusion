const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema from mongoose

const userRoleSchema = new Schema({
  id: { type: Number, unique: true }, // Primary key
  name: { type: String, required: true },
});

module.exports = mongoose.model('UserRole', userRoleSchema);


