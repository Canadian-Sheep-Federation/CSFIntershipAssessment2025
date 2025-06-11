/**
 * @file feedbackRoutes.js
 * @description Express route handlers for the Carma vehicle feedback API
 *
 * Provides the following RESTful endpoints (mounted under /api/feedback):
 *
 *  POST   /api/feedback       -> Submit a new feedback form
 *  GET    /api/feedback/:id   -> Fetch a single feedback entry by ID
 *  GET    /api/feedback       -> Fetch all feedback entries
 *
 * All feedback is stored in MongoDB using the Feedback model
 */

// initialize express, import feedback model
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST / -> create new feedback (let users submit their own rating and opinion of a car)
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body); // create new doc from request body
    await feedback.save(); // save to MongoDB
    res.status(201).json({ id: feedback._id }); // return the new id
  } catch (err) {
    res.status(400).json({ error: err.message }); // simple error handling
  }
});

// GET /:id -> get a single person's review  (look up reviews about a car from a person)
router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id); // find id in MongoDB
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found!" });
    }
    res.json(feedback); // send feedback back to browser
  } catch (err) {
    res.status(500).json({ error: err.message }); // simple error handling
  }
});

// GET / -> get all feedback/listings
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // grab all feedbacks from MongoDB, where the newest are on top
    res.json(feedbacks); // send them to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
