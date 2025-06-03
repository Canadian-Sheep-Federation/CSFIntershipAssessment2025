/**
 * This file handles SQLite database connection and schema creation
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.resolve(__dirname, '../data/form_responses.db');

// Ensure data directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
}

// Remove existing database file if it's corrupted
try {
  if (fs.existsSync(dbPath)) {
    const testDb = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
    testDb.close();
  }
} catch (error) {
  console.log('Database file appears corrupted, recreating it...');
  fs.unlinkSync(dbPath);
}

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

/**
 * Initialize the database schema
 */
function init() {
  // Directory creation moved to top of file
  
  // Create the form_responses table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS form_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      favorite_breed TEXT NOT NULL,
      rating INTEGER,
      comments TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = {
  db,
  init
};
