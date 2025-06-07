# Agriculture Planner

## Project Overview

This repository contains an **Agriculture Planner** web application and API, designed for the Canadian Sheep Federation internship take-home assignment. It consists of:

- **backend/**: a Node.js + Express REST API using SQLite (`agri.db`) to store agriculture plans and proxy weather data from Weatherstack.
- **frontend/**: a static web app (HTML/CSS/JavaScript) that consumes both the backend API and Weatherstack via the proxy.

## Key Features

1. **Create & Store Plans**  
   - Lookup current weather by city.  
   - Fill in a form (crop, activity, area, expected yield, seed type, notes).  
   - Save the plan along with weather details.

2. **View Saved Plans**  
   - List all stored plans in a table.  
   - Click on a row to view detailed plan and full weather breakdown.

3. **Average Weather Analysis**  
   - Select a city to see average temperature and most common condition from stored plans.  
   - Interactive monthly average-temperature chart.

4. **API Test Page**  
   - Dedicated `api.html` for manual testing of `POST /api`, `GET /api/:id`, and `GET /api`.

## Requirements

- **Node.js** v14+ and **npm** v6+  
- Free **Weatherstack** API Key (set in `backend/.env` as `WEATHERSTACK_KEY`)

## API Endpoints

| Method | Endpoint               | Description                                     | Consumed By Frontend                                      |
|--------|------------------------|-------------------------------------------------|-----------------------------------------------------------|
| GET    | `/weather?city=<name>` | Proxy to Weatherstack `/current` endpoint.      | **index.html**: Fetches weather when user clicks “Fetch Weather.” |
| POST   | `/api`                 | Create a new agriculture plan.                 | **main.js**: Submits form data (including weather) on submit. |
| GET    | `/api/:id`             | Retrieve a single plan by ID.                   | **main.js**: Loads detailed data when a table row is clicked. |
| GET    | `/api`                 | Retrieve all plans.                             | **main.js**: Populates the plans table; **api.js**: Fetches for API test page. |

## How to Run

1. **Backend**  
   ```bash
   cd backend
   npm install
   rm agri.db          # remove old database
   npm start           # serves on http://localhost:3000
   ```

2. **Frontend**  
   - Open your browser at `http://localhost:3000/` for the main app.  
   - Navigate to `http://localhost:3000/api.html` for direct API testing.

## Extensions & Deployment

- **Database**: Swap SQLite for MongoDB Atlas to enable horizontal scaling, replication, and automated backup.  
- **Security**: Add JWT authentication and role-based access control to secure endpoints.  
- **Docker**: Containerize services with Docker and orchestrate using Docker Compose or Kubernetes.  
- **CI/CD**: Implement GitHub Actions pipelines to automate linting, testing, building, and deploying.

## Bonus Points Answers

- **Scalable Data Store**  
  Migrating from a local SQLite file to a managed MongoDB Atlas cluster enables data sharding, high availability, and automated backups. This setup supports larger datasets and growth without schema changes.

- **Authentication & Authorization**  
  Implementing JWT-based authentication provides a secure way to verify users, while role-based permissions ensure that only authorized personnel can create or view plans. Integrating OAuth2 (e.g., Google login) can simplify user onboarding.

- **Automated Testing**  
  Writing unit tests with Jest for utility functions and integration tests with Supertest for API routes helps detect regressions early. Front-end testing with Cypress (end-to-end) validates user flows, ensuring UI functionality across browsers.

- **Continuous Integration/Continuous Deployment (CI/CD)**  
  Creating GitHub Actions workflows that run tests, build Docker images, and deploy to cloud platforms (AWS ECS, Heroku, DigitalOcean) streamlines development. Automated deployment pipelines reduce manual errors and speed up feature releases.

- **Offline Support**  
  Using service workers and the Cache API in the front-end allows caching static assets and API responses. Users can still view and draft plans offline, with synchronization when connectivity returns, improving reliability in the field.

- **Microservices Architecture**  
  Splitting the application into separate microservices—one for weather-proxy, another for plan management—promotes modularity and independent scaling. Communication can be handled via REST or message brokers (RabbitMQ, Kafka) for robust, decoupled systems.

- **Standardization**  
  Adding an i18n library (i18next) externalizes all UI text, enabling translations and locale-specific formatting. Support for English and French (Canada’s official languages) ensures accessibility for a broader user base.
