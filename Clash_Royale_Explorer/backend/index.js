// Importing required modules
const express = require("express"); // Express web framework
const router = require("./routes/formresponse.route"); // Form response route handler
const clashRoyaleRouter = require("./routes/clashroyale.route"); // Clash Royale API route handler
const mongoose = require("mongoose"); // Mongoose for MongoDB interaction
const app = express(); // Creating the Express app instance
const cors = require("cors"); // Middleware to enable CORS
require("dotenv").config(); // Load environment variables from .env file

// -----------------------------
// Middleware Configuration
// -----------------------------

// Parses incoming JSON requests (body parser)
app.use(express.json());

// Enables Cross-Origin Resource Sharing (allows frontend on another domain/port to access the API)
app.use(cors());

// -----------------------------
// Route Handlers
// -----------------------------

// Handles all form response related routes (e.g., POST /, GET /)
app.use("/api/form-responses", router);

// Handles Clash Royale card data requests (e.g., GET /cards)
app.use("/api/clash-royale", clashRoyaleRouter);

// -----------------------------
// Database Connection & Server Start
// -----------------------------

/**
 * Connects to the MongoDB database using the MONGODB_URI in the .env file.
 * If successful, starts the Express server.
 */
function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB!");

      // Start the server on the specified PORT from .env or default to 3000
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}!`);
      });
    })
    .catch(() => {
      console.log("Connection to MongoDB failed!");
    });
}

// Call the function to connect and run the server
connectToDatabase();
