# Canadian Sheep Federation Software Developer Assessment

## Overview

This is a full-stack application that allows users to search for definitions of words and view and even add example sentences for those words using the STANDS4 API for the dictionary API used.

## Technologies Used

### Backend

- Node.js
- Prisma
- Postgres

### Frontend

- React.js
- Next.js
- Tailwind CSS

## How it can be extended

- Add a user authentication system
- Add a user profile page

## How to Run

### Backend
- Please set up a PostgreSQL database by proving the database through the `DATABASE_URL` environment variable through `/backend/.env` file.
- Then to apply the schema, run the following command in the `/backend` directory:
  ```bash
  npx prisma migrate dev --name init
  ```
- To set up the dictionary API through the [STANDS4 Synonyms API](https://www.synonyms.com/synonyms_api.php), please get the credentials from [STANDS4](https://www.abbreviations.com/api.php) and set the `UID` and `TOKEN_ID` environment variables from your account


> **Note:** You must use Node.js v18 or higher, or else you must use [`node-fetch`](https://www.npmjs.com/package/node-fetch).

### Frontend

- If the backend is not on `localhost:3000`, please set the `NEXT_PUBLIC_API_URL` environment variable in the `/frontend/.env` file to the URL of the backend API.
- To run the frontend, run the following command in the `/frontend` directory (make sure the backend is running first in localhost:3000 or set the URL in the `NEXT_PUBLIC_API_URL` environment variable):
  ```bash
  npm run dev
  ```
  Or if you want to build the frontend, run:
  ```bash
  npm run build
  ```
- Then you can run the built frontend with:
  ```bash 
  npm start
  ```
