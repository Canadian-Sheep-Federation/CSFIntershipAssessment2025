// Express routes for handling submission-related API endpoints
const express = require('express');
const Submission = require('../models/Submission');

const router = express.Router();

// Create a new submission
router.post('/', async (req, res) => {
  try {
    const submission = new Submission(req.body);
    const saved = await submission.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err });
  }
});

// Get a submission by its ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

// Get all submissions
router.get('/', async (_req, res) => {
  try {
    const all = await Submission.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

// Export the router to be used in the main app
module.exports = router;
