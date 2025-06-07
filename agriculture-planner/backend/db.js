const Database = require("better-sqlite3");
const path = require("path");

// Path to the SQLite file:
const dbPath = path.join(__dirname, "agri.db");
const db = new Database(dbPath);

// If agri_plans does not exist, create it
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS agri_plans (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    crop           TEXT    NOT NULL,
    city           TEXT    NOT NULL,
    activity       TEXT    NOT NULL,
    area           REAL    NOT NULL,
    expected_yield REAL    NOT NULL,
    seed_type      TEXT    NOT NULL,
    notes          TEXT,
    weather        TEXT,              -- JSON string of Weatherstack “current”
    createdAt      DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;
db.exec(createTableSQL);

module.exports = db;
