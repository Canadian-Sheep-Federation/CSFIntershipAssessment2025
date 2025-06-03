/**
 * This file contains data access methods for form responses
 */

const { db } = require('../db');

/**
 * Create a new form response in the database
 * @param {Object} formData - The form data to be stored
 * @returns {Promise} - Resolves with the ID of the newly created response
 */
function createFormResponse(formData) {
  return new Promise((resolve, reject) => {
    const { name, email, favorite_breed, rating, comments } = formData;
    
    const sql = `
      INSERT INTO form_responses (name, email, favorite_breed, rating, comments)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [name, email, favorite_breed, rating, comments], function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID); // Return the ID of the newly created record
    });
  });
}

/**
 * Get a form response by its ID
 * @param {number} id - ID of the form response to retrieve
 * @returns {Promise} - Resolves with the form response object
 */
function getFormResponseById(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM form_responses WHERE id = ?`;
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

/**
 * Get all form responses
 * @returns {Promise} - Resolves with an array of all form responses
 */
function getAllFormResponses() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM form_responses ORDER BY created_at DESC`;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

module.exports = {
  createFormResponse,
  getFormResponseById,
  getAllFormResponses
};
