# Wool Weather Tracker 🐑

A simple web application that allows users to submit sheep-related condition reports based on live weather data for a selected city.

**Tech Stack:**
- Backend: Node.js, Express, SQLite3
- Frontend: HTML, CSS, JavaScript
- Public API: [WeatherStack](https://weatherstack.com/)

## Installation
- Prerequisites:
    - Node.js (v16+ recommended)
    - npm
    - A [WeatherStack API Key](https://weatherstack.com/)

1. Clone the repository and install the dependencies
    ```bash
    git clone https://github.com/MakayaYoel/CSFIntershipAssessment2025
    cd CSFIntershipAssessment2025
    npm install
    ```
2. Setup your environment variables.
    - Rename the ``.env.example`` to ``.env``, then setup your variables
    ```ini
    WEATHER_STACK_API_KEY="api-key-kere"
    PORT="port-here"
    ```
3. Start the app up :D, then visit http://localhost:chosen-port
    ```bash
    npm run dev
    ```

## Features

### Web App
- Search any city to view the current temperature, weather, and observation time.
- Submit a report including:
    - Sheep Behavior (Calm, Anxious, etc.)
    - Wool Condition (Good, Fair, etc.)
- View recent and individual reports submitted by others.

### API
- ``POST /api/`` – Creates a new report.
    - Example Request Body:
        ```json
        {
            "location": "Toronto",
            "condition": "Good",
            "behavior": "Calm",
            "temperature": "18°C",
            "weather_description": "Partly Cloudy"
        }
        ```
    - Example Response:
        ```json
        { 
            "message": "Entry successfully entered.", 
            "id": 1
        }
        ```
- ``GET /api/`` – Fetches all reports.
    - Example Response:
        ```json
        [
            {
                "id": 1,
                "location": "Toronto",
                "condition": "Good",
                "behavior": "Calm",
                "temperature": "18°C",
                "weather_description": "Partly Cloudy",
                "created_at": "2025-06-04 02:45:34"
            },
            ...
        ]
        ```
- ``GET /api/:id`` – Fetches report by ID.
    - Parameters:
        - ``:id`` – Numeric ID of the report 
    - Example Response:
        ```json
        {
            "id": 1,
            "location": "Toronto",
            "condition": "Good",
            "behavior": "Calm",
            "temperature": "18°C",
            "weather_description": "Partly Cloudy",
            "created_at": "2025-06-04 02:45:34"
        }
        ```
- ``POST /api/fetch-weather`` – Fetches current weather for a city using the WeatherStack API.
    - Example Request:
        ```json
        {
            "city": "Toronto"
        }
        ```
    - Example Response:
        - An example reponse can be found [here](https://weatherstack.com/documentation#:~:text=JSONP%20Callbacks.-,Example%20API%20Response%3A,-The%20successful%20API). 

## Improvements
- Adding input and form validation + error messaging UI for better security and UX.

- Adding user authentication to support editing and deleting reports.

- Improving UI/UX with transitions, better design, mobile responsiveness.

- Adding search/sort/filter for reports.

- Add charts/graphs for weather-behavior correlation.

## Deployment

This app can be deployed on any Node-compatible platform (e.g. Vercel, Heroku, Render, etc.), all you need to do is:
1. Add the ``PORT`` and ``WEATHER_STACK_API_KEY`` as environment variables.
2. Use a production-ready SQLite database.

## Demo
https://github.com/user-attachments/assets/983e3348-346d-40d0-b769-3edf362800fa
