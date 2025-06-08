import express from 'express';
import { openDB } from '../db.js';
const router = express.Router();

// Create table if it doesn't exist
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

export default router;
