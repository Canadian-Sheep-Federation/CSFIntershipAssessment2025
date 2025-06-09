// Main entry point: sets up Express server, connects to MongoDB, and loads API routes
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const grazingRoutes = require('./routes/grazing');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Routes
app.use('/grazing', grazingRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Mongo connection error:', err));