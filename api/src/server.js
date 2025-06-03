/**
 * This file sets up the Express server and connects routes
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./app');

// Port configuration
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
