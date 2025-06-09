import fs from "fs";
import path from "path";
import { openDb } from "./Db.js";

// Ensure DB is ready, set up table is does not exist
export async function initializeDatabase() {
  const dbFolder = "./data";
  const dbPath = path.join(dbFolder, "sheep.db");

  // Ensure folder exists
  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
  }

  // Always open DB and run CREATE TABLE (safe because IF NOT EXISTS)
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sheep (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      breed TEXT,
      weightKg REAL,
      gender TEXT,
      location TEXT,
      latitude REAL,
      longitude REAL
    );
  `);

  console.log("Sheep database initialized.");
}
