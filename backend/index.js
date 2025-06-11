/**
 * @file server.js
 * @description Entry point for the Carma backend API
 *
 * Responsibilities:
 *  - Loads environment variables
 *  - Connects to MongoDB via Mongoose
 *  - Sets up middleware: CORS and JSON parsing
 *  - Mounts the feedback API routes at /api/feedback
 *  - Starts the Express server on the specified port
 */

// import express, mongoose and CORS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// create express app, and use env port or 5000
const app = express();
const PORT = process.env.PORT || 5000;

// enable CORS (so frontend can connect) & allow app to parse JSON body
app.use(cors());
app.use(express.json());

options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("mongo db error:", err.message);
  });

//import routes
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// start the server
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
