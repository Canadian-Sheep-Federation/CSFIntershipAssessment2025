import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import { FETCH_ALL_ENTRIES, FETCH_ENTRY, INSERT_NEW_ENTRY } from "./database/queries.js";

const app = express();

app.use(express.json()); // for parsing requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // to allow HTML form payloads
app.use(express.static('public')); // to serve static files

dotenv.config(); // enables env. variables

// Create a router for API routes
const apiRouter = express.Router();

// Gets all tracker entries
apiRouter.get('/', (req, res) => {
    // query the database for all entries
    db.all(FETCH_ALL_ENTRIES, (err, rows) => {
        if(err) {
            return res.status(500).json({ error: "Internal Server Error"});
        }

        // return rows
        return res.json(rows);
    });
});

// Gets a specific tracker entry
apiRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    // query database for entry
    db.get(FETCH_ENTRY,  [id], (err, row) => {
        if(err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // return row
        return res.send(row);
    });
});

// Stores a new tracker entry and returns its ID
apiRouter.post('/', (req, res) => {
    // get form inputs
    const { location, behavior, condition, temperature, weather_description } = req.body;

    // insert new row into database
    db.run(INSERT_NEW_ENTRY, [location, behavior, condition, temperature, weather_description], function (err) {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // return message and new entry ID.
        return res.json({ message: "Entry successfully entered.", id: this.lastID });
    });
});

// Fetches and returns a city's data
apiRouter.post('/fetch-weather', async (req, res) => {
    const apiKey = process.env.WEATHER_STACK_API_KEY;
    const { city } = req.body;

    try {
        // fetch weather data
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=m`);
        const data = await response.json();

        if(data.error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json(data);
    } catch (error) {
        // api call failed.
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch weather data." });
    }
});

// To avoid CORS and duplicate '/' route issues (frontend is being served by express as well).
app.use('/api', apiRouter);

const port = process.env.PORT;

// Start Application
app.listen(port, () => {
    console.log(`Backend has started at: http://localhost:${port}`);
});