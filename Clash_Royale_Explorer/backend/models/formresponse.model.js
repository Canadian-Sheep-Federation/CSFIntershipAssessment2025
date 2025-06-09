// ---------------------------------------------
// Model File: formresponse.model.js
// ---------------------------------------------
// This file defines the Mongoose schema and model for a form response.
// Each form response contains a unique ID, number of trophies, a favorite card, and a reason.
// ---------------------------------------------

// Import mongoose for schema
const mongoose = require("mongoose");

// ---------------------------------------------
//  Form response schema
// ---------------------------------------------
const formResponseSchema = mongoose.Schema(
  {
    // Unique identifier for each form (assigned manually) that uses numbers starting from 0
    formID: {
      type: Number,
      required: [true], // Marks this field as required
    },

    // User's trophy amount
    trophyNumber: {
      type: Number,
      required: [true],
      default: 0,
    },

    // User's favorite Clash Royale card
    favCard: {
      type: String,
      required: [true],
    },

    // Reason why the user picked this card
    reason: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields just in case
  }
);

// ---------------------------------------------
// Create and export the Mongoose model
// Note: Mongoose will automatically pluralize 'formresponse' to 'formresponses' in the DB
// ---------------------------------------------
const formResponse = mongoose.model("formresponse", formResponseSchema);

module.exports = formResponse;
