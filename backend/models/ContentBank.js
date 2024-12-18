const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentBankSchema = new Schema({
    name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    file_type: { type: String, enum: ['Portraits', 'Audio', 'Video', 'Text'] },
    is_sample: { type: Boolean, default: false },
    file_s3_key: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'uploaded', 'processing', 'completed'], default: 'pending' }, // Add this field to track the status
    download_count: { type: Number, default: 0 }, 
  });
  
  module.exports = mongoose.model('ContentBank', contentBankSchema);
  