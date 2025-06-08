# CSF Internship Take-Home

## Overview
This project implements:

- **API**: Node.js + Express + SQLite REST API for a "Pokémon survey"  
- **Web App**: React + Axios front-end that:  
  1. Queries the public [PokeAPI](https://pokeapi.co/) for Pokémon data  
  2. Lets users submit their "favorite Pokémon" survey (3 fields: name, favoritePokemon, comment)  
  3. Displays all previous survey responses  

---

## Getting Started

### Prerequisites
- Node.js v14 or higher  
- npm (comes with Node.js)

### Clone & Checkout
```bash
git clone https://github.com/<your-username>/CSFIntershipAssessment2025.git
cd CSFIntershipAssessment2025
git checkout feature/webapp
```

### Run the API
```bash
cd api
npm install
npm start   # starts server on http://localhost:3000
```

### Run the Web App
```bash
cd webapp
npm install
npm start   # opens UI on http://localhost:3001
```

## API Endpoints

### POST /responses

Body (JSON):
```json
{
  "name": "Your Name",
  "favoritePokemon": "Pikachu",
  "comment": "Your comment here"
}
```

Returns:
```json
{ "id": 1 }
```

### GET /responses
Returns a list of all survey entries.

### GET /responses/:id
Returns a single survey entry by its ID.

## Manual Testing Examples
Copy-paste these in a separate terminal while your API is running:

```bash
# Create a new response
curl -X POST http://localhost:3000/responses \
  -H "Content-Type: application/json" \
  -d '{"name":"Ash","favoritePokemon":"Charizard","comment":"Fire power!"}'

# List all responses
curl http://localhost:3000/responses

# Get one response by ID
curl http://localhost:3000/responses/1
```

## Bonus / Next Steps

### Extensions
- Add input validation (enforce non-empty strings, length limits)
- Implement user authentication to tie responses to accounts
- Allow image uploads (profile pictures)
- Expand the form with more survey questions

### Deployment
- Use Docker for the API and front-end
- Host the API on Heroku, AWS, or DigitalOcean
- Deploy the front-end on Netlify or Vercel
- Switch SQLite to a hosted database such as MongoDB for production

### UI Improvements
- Inline form validation errors
- Loading spinners during API calls
- Responsive styling and polished design

## Public API
Used the PokeAPI (no API key required) to fetch Pokémon details:
https://pokeapi.co/