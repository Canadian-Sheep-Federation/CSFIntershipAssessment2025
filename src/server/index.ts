import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { Response } from './models/Response';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cat-facts-app';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.get('/api/cat-facts', async (req, res) => {
  try {
    const response = await axios.get('https://cat-fact.herokuapp.com/facts');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cat facts' });
  }
});

app.post('/api/responses', async (req, res) => {
  try {
    const { catFactId, userName, userResponse } = req.body;
    const response = new Response({ catFactId, userName, userResponse });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save response' });
  }
});

app.get('/api/responses', async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 