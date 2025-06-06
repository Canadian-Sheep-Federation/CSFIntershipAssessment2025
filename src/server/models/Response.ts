import mongoose from 'mongoose';

// Response schema to be saved on mongodb
const responseSchema = new mongoose.Schema({
  catFactId: { type: String, required: true },
  userName: { type: String, required: true },
  userResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Response = mongoose.model('Response', responseSchema); 