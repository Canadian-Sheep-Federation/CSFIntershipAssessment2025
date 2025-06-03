/**
 * This file defines the routes for form-related endpoints
 */

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

/**
 * @route   POST /
 * @desc    Create a new form response
 * @access  Public
 */
router.post('/', formController.createFormResponse);

/**
 * @route   GET /:id
 * @desc    Get a form response by ID
 * @access  Public
 */
router.get('/:id', formController.getFormResponseById);

/**
 * @route   GET /
 * @desc    Get all form responses
 * @access  Public
 */
router.get('/', formController.getAllFormResponses);

module.exports = router;
