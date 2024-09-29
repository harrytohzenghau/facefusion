const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnimationJobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  portrait_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  audio_file: {
    type: String,
  },
  job_type: {
    type: String,
    enum: ['FacialAnimation', 'LipSync', 'Expression'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  completed_at: {
    type: Date,
  },
  video_url: {
    type: String, // URL to the generated animation video if available
  }
});

module.exports = mongoose.model('AnimationJob', AnimationJobSchema);
