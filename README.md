# CSF Intership Assessment 2024

If you are interested in an internship opportunity with the Canadian Sheep Federation for Summer 2023, please complete the tasks outlined in the .md file relevant to what you are interested in doing this summer.

E.g. those interested in QA should complete the QA assignment.

# Cat Facts & Responses Application

A full-stack web application that allows users to view cat facts from a public API and submit their responses. The application uses MongoDB to store user responses and provides a modern UI built with React and Material-UI.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas connection string)
- npm or yarn package manager

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cat-facts-app
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run server:dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   npm run client:dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Features

- View random cat facts from the public API
- Submit responses to cat facts
- View all submitted responses
- Modern, responsive UI built with Material-UI
- Real-time updates when new responses are submitted

## API Endpoints

- `GET /api/cat-facts`: Fetch cat facts from the public API
- `POST /api/responses`: Submit a new response
- `GET /api/responses`: Get all submitted responses

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Vite
  - Axios

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Mongoose
