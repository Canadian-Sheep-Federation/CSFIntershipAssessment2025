// -----------------------------------------------------
// This file defines controller functions for handling
// requests to the Clash Royale public API.
// It fetches card and challenge data from the official API.
// -----------------------------------------------------

// Load environment variables (e.g. API_KEY) from .env file into process.env
require("dotenv").config();

/**
 * Fetches Clash Royale card data from the public API
 * @param {*} req Not being used
 * @param {*} res The data of all cards
 */
function getCards(req, res) {
  try {
    fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`, // Use API key securely from .env
      },
    })
      .then((cr) => cr.json()) // Convert response to JSON
      .then((data) => res.send(data)); // Send JSON response back to client
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ error_message: error.message });
  }
}

/**
 * Fetches Clash Royale challenge data from the public API
 * @param {*} req Not being used
 * @param {*} res The data of all challenges
 */
function getChallenges(req, res) {
  try {
    fetch("https://api.clashroyale.com/v1/challenges", {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((cr) => cr.json())
      .then((data) => res.send(data));
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
}

// Export controller functions to be used in routing
module.exports = { getCards, getChallenges };
