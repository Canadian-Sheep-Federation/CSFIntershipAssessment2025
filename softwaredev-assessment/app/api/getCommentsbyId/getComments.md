# API Route: Get Comments

This API route handles **GET** requests to fetch comments (reviews) for NBA teams from a MongoDB collection.

## Environment Variables Required

- `MONGO_URI`: MongoDB connection string
- `MONGO_DB_NAME`: Name of the MongoDB database
- `MONGO_COLLECTION_TEAMS`: Name of the collection storing team reviews

## Query Parameters

- `teamId` (optional): If provided, only reviews for the specified team will be returned.

## How It Works

1. **Checks for required environment variables.**
2. **Connects to MongoDB** using the provided URI and database/collection names.
3. **Reads the `teamId` from the query string**.
4. **Fetches reviews**:
    - If `teamId` is provided, only reviews for that team are fetched.
    - If not, all reviews are fetched.
5. **Returns the reviews as JSON** with status 200.
6. **Handles errors** and returns a 500 status with an error message if something goes wrong.

## Example Usage

**Request:**
GET /api/getComments?teamId=123


**Response:**
```json
[
  {
    "_id": "...",
    "teamId": "123",
    "username": "JaneDoe",
    "team": "Lakers",
    "rating": 5,
    "comment": "Great team!",
    "favoritePlayer": "LeBron James",
    "createdAt": "2025-06-07T12:00:00Z"
  },
  ...
]