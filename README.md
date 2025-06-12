# Canadian Sheep Federation Software Developer Assessment

## Overview

This is a full-stack application that allows users to rate an actor or actress's acting in a move or TV Show. Powered by the IMDb API.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- IMDb API

### Frontend

- React.js
- Vite
- SCSS

## How it can be extended

- Add a user authentication system
- Add a user profile page

## How to Run

### Backend

Prepare a MongoDB database and set the `MONGO_URL` environment variable to the URL of the database. Then, set the `IMDB_API_KEY` environment variable to the IMDb API key. Finally, run `npm install` and `npm start` to start the backend server. You can set the environment variables in a `.env` file, make sure it is at `/server/.env`.

> **Note:** You must use Node.js v18 or higher, or else you must use [`node-fetch`](https://www.npmjs.com/package/node-fetch).

### Frontend

Set the `VITE_API_URL` environment variable to the URL of the backend API. Then, run `npm install` and `npm run dev` to start the frontend server. You can set the environment variables in a `.env` file, make sure it is at `/frontend/.env`.

## How to Deploy

The backend is a standard Node.js application and would be deployed like any typical Node.js application. Be sure to set the `IMDB_API_KEY` environment variable as well as `MONGO_URL` for a MongoDB database to store and connect to.

The frontend is made with React.js and Vite. Be sure to set the `VITE_API_URL` environment variable to the URL of the backend API. Refer to the Vite [documentation](https://vitejs.dev/guide/static-deploy.html) for more information on how to deploy a Vite application.
