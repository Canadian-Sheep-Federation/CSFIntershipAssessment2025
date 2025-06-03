/**
 * This file contains controller methods for handling form-related HTTP requests
 */

const formModel = require('../models/formModel');

/**
 * Create a new form response
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function createFormResponse(req, res, next) {
  try {
    // Validate required fields
    const { name, email, favorite_breed } = req.body;
    
    if (!name || !email || !favorite_breed) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and favorite_breed are required'
      });
    }
    
    // Create the form response
    const formData = {
      name,
      email,
      favorite_breed,
      rating: req.body.rating || null,
      comments: req.body.comments || null
    };
    
    const id = await formModel.createFormResponse(formData);
    
    res.status(201).json({
      success: true,
      message: 'Form response created successfully',
      id
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a form response by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getFormResponseById(req, res, next) {
  try {
    const id = req.params.id;
    
    const formResponse = await formModel.getFormResponseById(id);
    
    if (!formResponse) {
      return res.status(404).json({
        success: false,
        message: `Form response with ID ${id} not found`
      });
    }
    
    res.json({
      success: true,
      data: formResponse
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all form responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getAllFormResponses(req, res, next) {
  try {
    const formResponses = await formModel.getAllFormResponses();
    
    res.json({
      success: true,
      count: formResponses.length,
      data: formResponses
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFormResponse,
  getFormResponseById,
  getAllFormResponses
};
