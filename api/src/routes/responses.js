import express from 'express';
import { openDB } from '../db.js';
const router = express.Router();

// 1. Create table if it doesn't exist
(async () => {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      favoritePokemon TEXT NOT NULL,
      comment TEXT NOT NULL
    )
  `);
})();

// 2. POST /responses create a new entry
router.post('/', async (req, res) => {
  const { name, favoritePokemon, comment } = req.body;
  if (!name || !favoritePokemon || !comment) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const db = await openDB();
  const result = await db.run(
    `INSERT INTO responses (name, favoritePokemon, comment) VALUES (?, ?, ?)`,
    name, favoritePokemon, comment
  );
  res.json({ id: result.lastID });
});

// 3. GET /responses list all entries
router.get('/', async (req, res) => {
  const db = await openDB();
  const rows = await db.all(`SELECT * FROM responses`);
  res.json(rows);
});

// 4. GET /responses/:id fetch one by id
router.get('/:id', async (req, res) => {
  const db = await openDB();
  const row = await db.get(`SELECT * FROM responses WHERE id = ?`, req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

export default router;
