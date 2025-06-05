// index.js
// Node.js + Express server to handle form submissions and serve frontend files.

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

/**
 * POST /form
 * Accepts a new feedback entry and stores it in the database.
 * Expects {username, trackId, rating, comment} in the body.
 */

app.post('/form', (req, res) => {
  const { username, trackId, rating, comment } = req.body;
  const stmt = db.prepare(`INSERT INTO feedback (username, trackId, rating, comment) VALUES (?, ?, ?, ?)`);
  stmt.run(username, trackId, rating, comment, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

/**
 * GET /form
 * Returns all feedback entries in the database.
 */
app.get('/form', (req, res) => {
  db.all(`SELECT * FROM feedback`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * GET /form/:id
 * Returns a specific feedback entry by ID.
 */
app.get('/form/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM feedback WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
