const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Setup database
const db = new sqlite3.Database('responses.db');
db.run(`CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  breed TEXT,
  reason TEXT
)`);

// POST - submit form
app.post('/', (req, res) => {
  const { name, breed, reason } = req.body;
  db.run(
    `INSERT INTO responses (name, breed, reason) VALUES (?, ?, ?)`,
    [name, breed, reason],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// GET by ID
app.get('/:id', (req, res) => {
  db.get(`SELECT * FROM responses WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// GET all
app.get('/', (req, res) => {
  db.all(`SELECT * FROM responses`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
