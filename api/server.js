const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 4000;
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (error) => {
  if (error)
    return console.error(error.message);
});

// creates the table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS SURVEY(userid TEXT PRIMARY KEY, region TEXT, pokemon TEXT, type TEXT)');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running.');
});

// inserts a new entry into the database if the userid doesn't exist, otherwise it updates the existing entry with new info
app.post('/submit', (req, res) => {
  const sql_query = `INSERT OR REPLACE INTO SURVEY(userid, region, pokemon, type) VALUES(?, ?, ?, ?)`;
  db.run(sql_query, [req.body.userid, req.body.region, req.body.pokemon, req.body.type], (error) => {
    if (error) {
      console.log(error.message);
    }
  });
  res.status(200).json(req.body.userid);
});

// returns an array of all the entries in the database
app.get('/getallentries', (req, res) => {
  const sql_query = `SELECT * FROM SURVEY`;
  db.all(sql_query, [], (error, rows) => {
    if (error) {
      console.log(error.message);
    }
    res.status(200).json({rows});
  });
});

// returns the database entry corresponding to the userid
app.get('/getentry/:userid', (req, res) => {
  const sql_query = `SELECT * FROM SURVEY WHERE userid = ?`;
  db.get(sql_query, [req.params.userid], (error, row) => {
    if (error) {
      console.log(error.message);
    }
    // if no entry is found, return null
    if (row === undefined) {
      res.status(200).json(null);
    } else {
      res.status(200).json({row});
    }
  });
});

// deletes all data from the database
app.delete('/clear', (req, res) => {
  const sql_query = `DELETE FROM SURVEY`;
  db.run(sql_query, [], (error) => {
    if (error) {
      console.log(error.message);
    }
    res.status(200).json();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});