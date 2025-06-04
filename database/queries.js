// Create Table
export const CREATE_TRACKER_ENTRY_TABLE = `
    CREATE TABLE IF NOT EXISTS tracker_entry(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL,
        behavior TEXT NOT NULL,
        condition TEXT NOT NULL,
        temperature TEXT NOT NULL,
        weather_description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

// Insert new tracking entry
export const INSERT_NEW_ENTRY = `INSERT INTO tracker_entry(
    location, 
    behavior, 
    condition,
    temperature,
    weather_description
) VALUES(?, ?, ?, ?, ?)
`;

// Fetch entry by ID
export const FETCH_ENTRY = `SELECT * FROM tracker_entry WHERE id = ?`;

// Fetch all entries
export const FETCH_ALL_ENTRIES = 'SELECT * FROM tracker_entry';