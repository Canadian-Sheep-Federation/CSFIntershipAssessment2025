/**
 * backend/index.js
 *
 * This Express server provides:
 *   • GET    /weather?city=<city>    → proxy to Weatherstack current-weather
 *   • POST   /api                    → create a new agriculture plan (returns { id })
 *   • GET    /api/:id                → fetch one plan by its ID
 *   • GET    /api                    → fetch all saved plans
 *
 * All other paths (e.g. `/`, `/index.html`, `/main.js`, `/styles.css`) 
 * are served from the `frontend/` directory as static files.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch"); // v2 syntax
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * GET /weather?city=<cityName>
 * 
 * Proxies a current-weather request to Weatherstack.
 * Query parameter:
 *   - city (string): e.g. "Toronto"
 * 
 * Response: JSON exactly as Weatherstack returns from `/current`.
 */
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Missing `city` query parameter." });
  }

  const apiKey = process.env.WEATHERSTACK_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Weatherstack key not configured" });
  }

  const encodedCity = encodeURIComponent(city.trim());
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodedCity}`;

  try {
    const wsRes = await fetch(weatherUrl);
    if (!wsRes.ok) {
      return res
        .status(wsRes.status)
        .json({ error: `Weatherstack returned status ${wsRes.status}` });
    }
    const weatherData = await wsRes.json();

    // If Weatherstack’s payload has an error field
    if (weatherData.success === false || weatherData.error) {
      return res.status(400).json({
        error: weatherData.error || "Error from Weatherstack",
      });
    }

    return res.json(weatherData);
  } catch (err) {
    console.error("Error fetching from Weatherstack:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


/**
 * POST /api
 *
 * Creates a new agriculture plan. Expects JSON body:
 *   {
 *     crop:           (string, required),
 *     city:           (string, required),
 *     activity:       (string, required),
 *     area:           (number, required),
 *     expected_yield: (number, required),
 *     seed_type:      (string, required),
 *     notes:          (string, optional),
 *     weather:        (object, optional)
 *   }
 *
 * Returns:
 *   { id: <newRecordId> }
 */
app.post("/api", (req, res) => {
  const {
    crop,
    city,
    activity,
    area,
    expected_yield,
    seed_type,
    notes,
    weather,
  } = req.body;

  // Validate required fields
  if (
    !crop ||
    !city ||
    !activity ||
    typeof area !== "number" ||
    typeof expected_yield !== "number" ||
    !seed_type
  ) {
    return res
      .status(400)
      .json({ error: "Missing or invalid fields in request body." });
  }

  try {
    const weatherJson = weather ? JSON.stringify(weather) : null;

    const stmt = db.prepare(
      `INSERT INTO agri_plans
         (crop, city, activity, area, expected_yield, seed_type, notes, weather)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const info = stmt.run(
      crop,
      city,
      activity,
      area,
      expected_yield,
      seed_type,
      notes || null,
      weatherJson
    );
    return res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    console.error("Error inserting agriculture plan:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * GET /api/:id
 *
 * Fetches a single agriculture plan by its numeric ID.
 * Path parameter:
 *   - id (integer)
 *
 * Response: the plan object (including parsed `weather`) or 404 if not found.
 */
app.get("/api/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number." });
  }

  try {
    const stmt = db.prepare(`SELECT * FROM agri_plans WHERE id = ?`);
    const plan = stmt.get(id);

    if (!plan) {
      return res.status(404).json({ error: "Agriculture plan not found." });
    }
    if (plan.weather) {
      try {
        plan.weather = JSON.parse(plan.weather);
      } catch {
        // leave it as a raw string if parsing fails
      }
    }
    return res.json(plan);
  } catch (err) {
    console.error("Error fetching plan by ID:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * GET /api
 *
 * Returns an array of all agriculture plans, newest first.
 * Each plan’s `weather` property is parsed back into an object (if present).
 */
app.get("/api", (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM agri_plans ORDER BY createdAt DESC`);
    const plans = stmt.all();

    const parsed = plans.map((plan) => {
      if (plan.weather) {
        try {
          plan.weather = JSON.parse(plan.weather);
        } catch {
          // leave as raw string if parsing fails
        }
      }
      return plan;
    });
    return res.json(parsed);
  } catch (err) {
    console.error("Error fetching all agriculture plans:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});


const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

app.listen(PORT, () => {
  console.log(`Agriculture Planner API is running on http://localhost:${PORT}`);
});
