# Agriculture Planner Front-End

## Overview

Static web application (HTML, CSS, vanilla JS) that:

- Queries the backend API to create and view agriculture plans.
- Proxies Weatherstack data via the backend.
- Provides interactive charts with Chart.js.

## File Structure

```
frontend/
├── index.html      # Main UI
├── api.html        # API test page
├── styles.css      # Shared styles
├── main.js         # Logic for index.html
└── api.js          # Logic for api.html
```

## Usage

1. **Main App (`index.html`)**  
   - Enter a city and click **Fetch Weather**.  
   - Fill the form (crop, activity, area, expected yield, seed type, notes).  
   - Click **Submit Plan**.  
   - View all plans in the table; click a row to see detailed info and full weather breakdown.  
   - Select a city from the dropdown to view average weather and a monthly chart.

2. **API Test Page (`api.html`)**  
   - **POST /api**: Create plans manually.  
   - **GET /api/:id**: Fetch a single plan.  
   - **GET /api**: Fetch all plans.

## Dependencies

- **Chart.js** (via CDN) for rendering the line chart.  
- No build tools; uses plain ES6 and modern browser APIs.

## Improvements

- Migrate to a front-end framework (React/Vue) for better maintainability.  
- Responsive design for mobile devices.  
- Client-side validation with inline error messages.  
- Store user preferences (e.g., last-selected city) in localStorage.

## Running

No server needed—served automatically by the backend’s static file handler. Just navigate to:

- `http://localhost:3000/` for the main UI.  
- `http://localhost:3000/api.html` for the API test page.
