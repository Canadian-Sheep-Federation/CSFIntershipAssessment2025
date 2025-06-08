const service = require('../services/submissionService');

// Create a new submission and return its ID
exports.createSubmission = async (req, res) => {
  const submission = await service.create(req.body);
  res.status(201).json({ id: submission._id });
};

// Get a submission by its ID
exports.getSubmissionById = async (req, res) => {
  const submission = await service.getById(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Not Found' });
  res.json(submission);
};

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  const submissions = await service.getAll();
  res.json(submissions);
};
