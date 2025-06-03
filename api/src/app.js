/**
 * This file configures the Express application and middleware
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const formRoutes = require('./routes/formRoutes');
const db = require('./db');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON request body

// Initialize database
db.init();

// Routes
app.use('/', formRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An error occurred',
    error: err.message
  });
});

module.exports = app;
