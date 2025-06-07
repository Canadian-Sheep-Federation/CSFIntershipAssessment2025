import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

const sq3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sq3.Database(
  "data/database.sqlite",
  sq3.OPEN_READWRITE | sq3.OPEN_CREATE,
  (err: any) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  },
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the cats table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS cats (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        photo_url TEXT NOT NULL,
        age INTEGER NOT NULL,
        weight DECIMAL(4,2) DEFAULT 2.00
      )`,
    (err: any) => {
      if (err) {
        return console.error(err.message);
      }
      //console.log("Created cats table.");

      // Clear the existing data in the cats table
      /*db.run(`DELETE FROM cats`, (err: any) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from cats");

        // Insert new data into cats table
        const values1 = [
          "Garry",
          "https://cataas.com/cat/wGuGDDq2UKUj1bTv/says/Hello?position=center&font=Impact&fontSize=50&fontColor=%23fff&fontBackground=none",
          2,
          3.4,
        ];

        const insertSql = `INSERT INTO cats(name, photo_url, age, weight) VALUES(?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err: any) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });


      });*/
    },
  );
  //Close databas connection
  db.close((err: any) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
});

export async function openDb() {
  return await open({
    filename: "data/database.sqlite",
    driver: sqlite3.Database,
  });
}
