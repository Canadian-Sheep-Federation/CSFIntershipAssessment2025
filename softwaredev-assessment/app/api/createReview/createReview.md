# API Route: Create Review

This API route handles **POST** requests to create a new review for an NBA team and store it in a MongoDB collection.

---

## Endpoint
POST /api/createReview

---

## Environment Variables Required

- `MONGO_URI`: MongoDB connection string
- `MONGO_DB_NAME`: Name of the MongoDB database
- `MONGO_COLLECTION_TEAMS`: Name of the collection storing team reviews

---

## Request Body

Send a JSON object with the following fields (all are required):

| Field           | Type    | Description                       |
|-----------------|---------|-----------------------------------|
| `username`      | string  | Username of the reviewer          |
| `team`          | string  | Name of the team                  |
| `teamId`        | string  | ID of the team                    |
| `rating`        | number  | Rating given to the team          |
| `comment`       | string  | Review comment                    |
| `favoritePlayer`| string  | Favorite player on the team       |
| `createdAt`     | string  | ISO date string of review creation|

**Example:**
```json
{
  "username": "JaneDoe",
  "team": "Lakers",
  "teamId": "123",
  "rating": 5,
  "comment": "Great team!",
  "favoritePlayer": "LeBron James",
  "createdAt": "2025-06-07T12:00:00Z"
}