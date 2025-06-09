import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a database handle
export async function openDb() {
  return open({
    filename: "./data/sheep.db",
    driver: sqlite3.Database
  });
}
