# Canadian Sheep Federation Assessment API

This is a RESTful API for managing form submissions related to sheep breeds. It allows for creating, retrieving individual, and listing all form responses.

## Features

- RESTful API with Express
- SQLite database for data persistence
- CORS enabled for cross-origin requests
- Error handling middleware
- Structured with MVC pattern

## Installation

1. Make sure you have Node.js installed
2. Clone the repository
3. Navigate to the API directory
4. Install dependencies:

```bash
npm install
```

## Running the API

### Development Mode

```bash
npm run dev
```

This uses nodemon to automatically restart the server when changes are detected.

### Production Mode

```bash
npm start
```

## API Endpoints

### Create Form Response

- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "favorite_breed": "Suffolk",
    "rating": 5,
    "comments": "I really like Suffolk sheep!"
  }
  ```
- **Required Fields**: `name`, `email`, `favorite_breed`
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Form response created successfully",
    "id": 1
  }
  ```

### Get Form Response by ID

- **URL**: `/:id`
- **Method**: `GET`
- **URL Params**: `id=[integer]`
- **Success Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "favorite_breed": "Suffolk",
      "rating": 5,
      "comments": "I really like Suffolk sheep!",
      "created_at": "2025-06-03T10:00:00.000Z"
    }
  }
  ```

### Get All Form Responses

- **URL**: `/`
- **Method**: `GET`
- **Success Response**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "favorite_breed": "Suffolk",
        "rating": 5,
        "comments": "I really like Suffolk sheep!",
        "created_at": "2025-06-03T10:00:00.000Z"
      }
    ]
  }
  ```

## Data Schema

The form responses are stored in a SQLite database with the following schema:

```sql
CREATE TABLE form_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  favorite_breed TEXT NOT NULL,
  rating INTEGER,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
