import sqlite3 from "sqlite3";
import { CREATE_TRACKER_ENTRY_TABLE } from "./queries.js";

// init. database (creates new file if needed)
const db = new sqlite3.Database("database.db");

// Create tracker entry table if it doesn't exist yet.
db.exec(CREATE_TRACKER_ENTRY_TABLE);

export default db;