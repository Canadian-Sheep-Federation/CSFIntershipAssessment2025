// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// POST /api - Save form response
app.post('/api', (req, res) => {
  const { fact, rating, comment } = req.body;
  if (!fact || !rating) {
    return res.status(400).json({ error: 'Fact and rating are required.' });
  }

  db.run(
    `INSERT INTO feedback (fact, rating, comment) VALUES (?, ?, ?)`,
    [fact, rating, comment],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// GET /api - Return all feedback
app.get('/api', (req, res) => {
  db.all(`SELECT * FROM feedback ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/:id - Return single feedback by ID
app.get('/api/:id', (req, res) => {
  db.get(`SELECT * FROM feedback WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Feedback not found' });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});