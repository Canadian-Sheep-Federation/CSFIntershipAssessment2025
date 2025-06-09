const express = require('express');                // Web framework for building API
const sqlite3 = require('sqlite3').verbose();      // SQLite3 database module
const cors = require('cors');                      // Enables Cross-Origin Resource Sharing
const bodyParser = require('body-parser');         // Parses incoming request bodies

// Initializing the Express app
const app = express();
const port = 3001;

// Apply middleware
app.use(cors());                      // Allow CORS for frontend-backend communication
app.use(express.json());              // Parse JSON bodies
app.use(bodyParser.json());           // Additional body parser support

// Set up SQLite database connection
const db = new sqlite3.Database('./forecastfits.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite DB.');
});

// Create the outfit_entries table if it doesn't already exist
db.run(`
  CREATE TABLE IF NOT EXISTS outfit_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    weather_condition TEXT NOT NULL,
    datetime TEXT NOT NULL,
    outfit TEXT NOT NULL,
    activity_type TEXT,
    comfort_level INTEGER
  )
`);

// Route: POST /form
// Save a new outfit entry to the database
app.post('/form', (req, res) => {
  console.log("Received POST /form:", req.body);

  const { city, weather_condition, datetime, outfit, activity_type, comfort_level } = req.body;

  // Basic validation for required fields
  if (!city || !weather_condition || !datetime || !outfit) {
    return res.status(400).json({ error: "City, weather_condition, datetime, and outfit are required." });
  }

  // Insert new entry into the database
  db.run(
    `INSERT INTO outfit_entries (city, weather_condition, datetime, outfit, activity_type, comfort_level)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [city, weather_condition, datetime, outfit, activity_type || null, comfort_level || null],
    function (err) {
      if (err) {
        console.error("Error inserting into DB:", err);  
        return res.status(500).json({ error: err.message });
      }
      // Return the ID of the newly inserted entry
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Route: GET /form/:id
// Retrieve a single outfit entry by ID
app.get('/form/:id', (req, res) => {
  const id = req.params.id;

  db.get(`SELECT * FROM outfit_entries WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Entry not found." });
    res.json(row);
  });
});

// Route: GET /form
// Retrieve all outfit entries, sorted by datetime (most recent first)
app.get('/form', (req, res) => {
  db.all(`SELECT * FROM outfit_entries ORDER BY datetime DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`ForecastFits API running at http://localhost:${port}`);
});
