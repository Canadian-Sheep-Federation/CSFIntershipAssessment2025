// ---------------------------------------------
// This file defines RESTful API routes related to form responses.
// These routes allow users to submit, retrieve all, or fetch specific responses.
// ---------------------------------------------

// Import necessary modules
const express = require("express");

// Import controller functions that handle the logic for each route
const {
  postResponse,   // Handles POST requests to submit a new form response
  getResponses,   // Handles GET requests to fetch all form responses
  getResponse,    // Handles GET requests to fetch a specific form response by ID
} = require("../controllers/formresponse.controller");

// Create a new Express Router instance
const router = express.Router();

// ---------------------------------------------
// Route Definitions
// ---------------------------------------------

// POST /api/form-responses
// Description: Receives a new form submission and stores it in the database
router.post("/", postResponse);

// GET /api/form-responses
// Description: Returns all form submissions from the database
router.get("/", getResponses);

// GET /api/form-responses/:id
// Description: Returns a specific form submission by its ID
router.get("/:id", getResponse);

// ---------------------------------------------
// Export the router for use in the main server
// ---------------------------------------------
module.exports = router;
