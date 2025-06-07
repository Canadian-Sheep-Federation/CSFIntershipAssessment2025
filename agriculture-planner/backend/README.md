# Agriculture Planner API (Backend)

## Overview

Implements a RESTful API in Node.js + Express, with a SQLite data store (`agri.db`) and a Weatherstack proxy.

## Endpoints

- **GET /weather?city=<name>**  
  Proxies to Weatherstack’s `/current` endpoint.  
  **Response:** JSON containing `location` and `current` weather data.

- **POST /api**  
  Create a new agriculture plan.  
  **Request Body (JSON):**
  ```json
  {
    "crop": "Wheat",
    "city": "Toronto",
    "activity": "Planting",
    "area": 10.5,
    "expected_yield": 75.3,
    "seed_type": "Hybrid X",
    "notes": "Start early in spring",
    "weather": { /* Weatherstack current */ }
  }
  ```
  **Response:** `201 Created` with JSON `{ "id": <newPlanId> }`.

- **GET /api**  
  Retrieve all plans, ordered newest first.  
  **Response:** Array of plan objects (including parsed `weather`).

- **GET /api/:id**  
  Retrieve a single plan by ID.  
  **Response:** JSON of the plan or `404 Not Found`.

## Setup & Run

1. Create a `.env` file in `backend/`:
   ```dotenv
   WEATHERSTACK_KEY=your_weatherstack_key
   ```
2. Install and start:
   ```bash
   cd backend
   npm install
   rm agri.db       # remove old DB to recreate schema
   npm start        # runs on http://localhost:3000
   ```
3. The SQLite database (`agri.db`) and table are created automatically.

## Development Notes

- Uses **better-sqlite3** for synchronous, low-overhead DB access.  
- Proxies Weatherstack to avoid exposing the API key on the front end.  
- CORS enabled for local development.

## Extensions

- Migrate to **MongoDB** for distributed use.  
- Add **user authentication** (JWT).  
- Rate-limit `/weather` calls.  
- Dockerize with a `Dockerfile` and `docker-compose.yml`.
