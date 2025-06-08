// Service layer for Submission model operations
const Submission = require('../models/Submission');

// Create a new submission
exports.create = (data) => Submission.create(data);
// Find a submission by its ID
exports.getById = (id) => Submission.findById(id);
// Retrieve all submissions
exports.getAll = () => Submission.find();

