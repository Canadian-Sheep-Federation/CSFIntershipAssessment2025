const mongoose = require('mongoose');

// Schema for the Submission model
const submissionSchema = new mongoose.Schema({
  gif_url: { type: String, required: true },
  mood_category: { type: String, required: true },
  mood_rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

// Export the Submission model for use in the app
module.exports = mongoose.model('Submission', submissionSchema);
