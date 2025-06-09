# 🐑 Canadian Sheep Federation - SoftwareDeveloperAssessment

This project is a full-stack web application developed for the Canadian Sheep Federation (CSF) internship take-home assessment. It includes a RESTful API using **Node.js, Express, and SQLite** and a responsive frontend built with **Vite and Vanilla JavaScript**.

The system enables users to add, store, and retrieve sheep entries with geolocation support using **Geoapify Autocomplete**, and visualizes sheep locations on a live map via **Leaflet**.

---

## 📦 Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm
- Git

### Installation

```bash
git clone https://github.com/Thehashhobo/CSFIntershipAssessment2025.git
cd csf-internship-assessment
```
## Frontend

```bash
cd frontend
npm install
npm run dev
```
## Backend

```bash
cd backend
npm install
node server.js
```

## Public API Used
Geoapify
🔗 https://www.geoapify.com/

Used for:
- Autocomplete address input new sheep form
- Extracting latitude and longitude
- Generating map tiles (via Leaflet)
---
## Features
- Sortable datagrid of all sheep entries
- Prepopulated DB for for easier project inspections
- Location autocomplete using Geoapify
- Leaflet map showing sheep location after lookup
- Toast confirmation after form submission
- Query sheep by ID and view detailed info + map

---
## Design Decisions
### Frontend: 
Modular JS with minimal external dependencies: While a framework like React or Vue would have made development faster, I intentionally chose modular Vanilla JavaScript to reinforce my core understanding of DOM manipulation, event handling, and state management. Despite my extensive experience with React, this project was a valuable opportunity to work closer to the metal and maintain full control over data flow and UI rendering. While frameworks are ideal for scalability, this approach helped sharpen my fundamentals.

### Backend:
#### Clean Architecture & DDD 
- entity/: The Sheep entity with pure logic
- application/: Application logic (getAll, getById, add)
- controllers/: request/response handlers
- repositories/: Data access layer
- infrastructure/: use Sqlite for permanent data storage
---
## Improvements & Extensions
### Frontend
- More Responsive Design.
- Accessibility through aria roles and better tag usage.
- Add filtering UI by breed/gender, etc.
- Improve DB scheme (for example, a table for sheep farms).
- Add map clustering for all sheep on one map.
- Add unit tests for form validation and API calls.
- Use modern framework such as React.

### Backend
- Add support for PUT and DELETE routes.
- Add advanced input validation using Zod or Joi.
- Server Side Pagination, filtering/sorting for large datasets and faster load times.
- More interfaces for more decoupled code.
---
## Deployment Suggestions

### Frontend
- Create .env file for api Key and routes.
- Deploy on Netlify, Vercel or github pages.

### Backend
- Host on Render, Fly.io, or Supabase for fast and easy setup, alternatively dockerize backend and host on Amazon ECS for better scalability and total infrastructure control.




















