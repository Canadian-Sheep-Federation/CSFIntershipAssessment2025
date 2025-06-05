// db.js
// This file sets up and exports a SQLite database connection.
// It creates a 'feedback' table to store user-submitted ratings for iTunes tracks.
const sqlite3 = require('sqlite3').verbose();

// Open database or create it new one if it doens't exist
const db = new sqlite3.Database('./database.sqlite');

// Initializing table schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      trackId TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT
    )
  `);
});

module.exports = db;
