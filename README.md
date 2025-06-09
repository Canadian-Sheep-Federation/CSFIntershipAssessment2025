
# CSF Internship Software Developer Assessment 2025

ForecastFits is a responsive web application built with React and Express.js. It allows users to query real-time weather data using the Weatherstack API and submit clothing/outfit responses based on current weather conditions. Submitted data is stored via a RESTful API in a SQLite database and displayed alongside others’ submissions for comparison and inspiration.
![image](https://github.com/user-attachments/assets/dc132e33-c54a-414d-958f-903ed7f541db)


## Features

- **Live Weather Search**: Query current weather by city using the Weatherstack API.
- **Outfit Submission Form**: Users can describe their outfit, activity type, and comfort level.
- **Community Feed**: View outfits submitted by other users based on weather conditions.
- **SQLite Storage**: Persistent storage using SQLite for quick prototyping and simplicity.
- **REST API**: A custom-built Express.js API with `GET` and `POST` endpoints.

## Tech Stack

- Frontend: React, JavaScript, Axios, CSS
- Backend: Node.js, Express.js
- Database: SQLite
- Public API: [Weatherstack API](https://weatherstack.com/)

## Project Structure

```
forecastfits/
├── forecastfits-frontend/   # React frontend
├── forecastfits-backend/    # Express backend with SQLite
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+) or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/forecastfits.git
cd forecastfits
```

2. Install frontend dependencies:

```bash
cd forecastfits-frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../forecastfits-backend
npm install
```

4. Set environment variables:

Create a `.env` file in `forecastfits-frontend`:

```
REACT_APP_WEATHERSTACK_API_KEY=your_api_key_here
```

5. Run the development servers:

Backend:

```bash
cd ../forecastfits-backend
node index.js
```

Frontend:

```bash
cd forecastfits-frontend
npm start
```

The app will run at `http://localhost:3000` and the API at `http://localhost:3001`.

## API Endpoints

### POST /form

Submit a new outfit entry.

### GET /form/:id

Retrieve a single outfit entry by ID.

### GET /form

Retrieve all submitted outfit entries.

## License

Distributed under the MIT License.

## Author

Prunellie Tchakam - Canadian Sheep Federation (Take-Home Assessment Project)

