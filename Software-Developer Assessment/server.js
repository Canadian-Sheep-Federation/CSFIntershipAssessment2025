const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./responses.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQLite DB.');
});

db.run(`CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movieTitle TEXT,
    userOpinion TEXT,
    rating INTEGER
)`);

app.post('/', (req, res) => {
    const { movieTitle, userOpinion, rating } = req.body;
    if (!movieTitle || !userOpinion || rating === undefined) {
        return res.status(400).json({ error: 'Missing field(s)' });
    }
    db.run(
        'INSERT INTO responses (movieTitle, userOpinion, rating) VALUES (?, ?, ?)',
        [movieTitle, userOpinion, rating],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.get('/:id', (req, res) => {
    db.get('SELECT * FROM responses WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    });
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM responses', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
