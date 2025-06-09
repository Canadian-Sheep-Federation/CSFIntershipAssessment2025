// ---------------------------------------------
// This file defines API routes related to Clash Royale.
// It maps each endpoint to its corresponding controller function.
// ---------------------------------------------

// Import necessary modules
const express = require("express");

// Import controller functions that handle the business logic
const {
  getCards,        // Handles GET requests to fetch all Clash Royale cards
  getChallenges,   // Handles GET requests to fetch active challenges (if applicable)
} = require("../controllers/clashroyale.controller");

// Create a new Express Router instance
const clashRoyaleRouter = express.Router();

// ---------------------------------------------
// Route Definitions
// ---------------------------------------------

// GET /api/clash-royale/cards
// Description: Returns data about all Clash Royale cards
clashRoyaleRouter.get("/cards", getCards);

// GET /api/clash-royale/challenges
// Description: Returns data about in-game challenges or events (if implemented)
clashRoyaleRouter.get("/challenges", getChallenges);

// ---------------------------------------------
// Export the router for use in the main server
// ---------------------------------------------
module.exports = clashRoyaleRouter;
