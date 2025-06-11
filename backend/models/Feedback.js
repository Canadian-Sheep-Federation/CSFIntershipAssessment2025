/**
 * @file Feedback.js
 * @description Mongoose model for vehicle feedback submissions
 *
 * Fields:
 *  - make:    Car manufacturer (e.g., "Toyota", "Porsche")
 *  - model:   Car model (e.g., "Camry", "GT3RS")
 *  - year:    Year of manufacture (e.g., 2024)
 *  - rating:  Integer between 1–5 representing user satisfaction
 *  - comment: Text-based user feedback about the vehicle
 *
 * The schema includes automatic timestamps (createdAt, updatedAt)
 * This model is used in the REST API to create and retrieve survey data
 */

// import mongoose for MongoDB
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    make: { type: String, required: true }, // ("Toyota", or "Porsche")
    model: { type: String, required: true }, // ("Camry", or "GT3RS")
    year: { type: Number, required: true }, // (2024)
    rating: { type: Number, min: 1, max: 5, required: true }, // 1-5 Rating
    comment: { type: String, required: true }, // "The Toyota Corolla is extremely fuel efficient! " or "The GT3RS is the ultimate track car, it blew my mind"
  },
  { timestamps: true } // adds timestamps automatically
);

// export model
module.exports = mongoose.model("Feedback", FeedbackSchema);
