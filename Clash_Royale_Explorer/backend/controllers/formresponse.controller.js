// -----------------------------------------------------
// This file defines controller functions for handling
// CRUD operations on form responses stored in MongoDB.
// -----------------------------------------------------

const FormResponse = require("../models/formresponse.model");

/**
 * Creates a new form response document in the database.
 * @param {*} req The form data from the user.
 * @param {*} res Returns the formID of the newly created response.
 */
async function postResponse(req, res) {
  try {
    const formres = await FormResponse.create(req.body); // Save form response
    res.status(200).json(formres.formID); // Respond with formID
  } catch (error) {
    // Handle server/database errors
    res.status(500).json({ message: error.message });
  }
}

/**
 * Retrieves all form responses from the database.
 * @param {*} req Not being used
 * @param {*} res Returns an array of form response objects.
 */
async function getResponses(req, res) {
  try {
    const forms = await FormResponse.find({}); // Fetch all responses
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


/**
 * Retrieves a single form response matching the given formID.
 * @param {*} req The Id that is wanted
 * @param {*} res The form details with the sent Id
 */
async function getResponse(req, res) {
  try {
    const formres = await FormResponse.find({ formID: req.params.id }); // Find by formID param
    res.status(200).json(formres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export controller functions for routing
module.exports = {
  postResponse,
  getResponses,
  getResponse,
};
