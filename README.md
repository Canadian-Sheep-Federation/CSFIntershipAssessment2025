# CSF Internship Assessment 2024

## Project Overview

This project demonstrates full-stack development skills by building a RESTful API and a web application that integrates with a public API. The backend is built with Node.js/Express and MongoDB, and the frontend uses React (Vite).

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (for backend; can use local or cloud instance)

### 1. Clone the repository
```
git clone https://github.com/a1stok/CSFIntershipAssessment2025.git
cd CSFIntershipAssessment2025/gif-mood-survey
```

### 2. Install dependencies
```
cd backend
npm install
cd ../frontend/app
npm install
cd ../../
```

### 2.1. Set up environment variables
- **Backend:**
  - Create a `.env` file in `gif-mood-survey/backend/` with:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/gifmoodsurvey
    ```
  - Make sure your MongoDB server is running and accessible. For easier setup and management, you can use [MongoDB Compass](https://www.mongodb.com/products/compass)
- **Frontend:**
  - Create a `.env` file in `gif-mood-survey/frontend/app/` with:
    ```
    VITE_GIPHY_API_KEY=YOUR_GIPHY_API_KEY
    ```
  - You can get a free Giphy API key at: https://developers.giphy.com/docs/api/#quick-start-guide

### 3. Start both servers together (from gif-mood-survey root)
```
npm run dev
```

### 4. Access the app
- Frontend: Open the URL shown in the terminal (usually http://localhost:5173)
- Backend API: Runs on http://localhost:3000 by default

---

## Project Structure
- backend/ — Node.js/Express API, MongoDB data store
- frontend/app/ — React web application (Vite)

---

## Features
- Submit and view survey responses
- Integrates with a public API for additional data
- RESTful API with endpoints:
  - POST / — Submit survey
  - GET /{id} — Get survey by ID
  - GET / — List all surveys

---

## Bonus Points: Extending, Improving, and Deploying the Application

### 1. Application & API Extensions
- **User Profiles & Social Features:**
  - Add user authentication and profiles, allowing users to create accounts, manage their submissions, and interact with others.
  - Transform the app into a social network where users can rate, comment on, and favorite GIFs or survey responses.
  - Enable users to curate personal collections (e.g., "Favorites" and "All" tabs).
- **Advanced Survey Features:**
  - Allow users to create their own surveys or polls.
  - Add analytics dashboards for survey results.
- **Public API Integration:**
  - Integrate with more public APIs (e.g., trending GIFs, meme generators, or NFT marketplaces).
  - Enable sharing of GIFs or survey results on social media.
- **Scalability:**
  - Refactor the backend to a microservices architecture for better scalability and maintainability.
  - Use FSD (Feature Sliced Design) architecture in the frontend for future growth.
- **NFT & Marketplace Extensions:**
  - Allow users to mint their favorite GIFs as NFTs and trade them in a marketplace.

### 2. Deployment Strategies
- **Frontend Deployment:**
  - Deploy the frontend to Vercel, Netlify, or similar platforms for fast, global delivery.
  - Use Tailwind CSS for rapid UI development and consistent design.
- **Backend Deployment:**
  - Use Render.com for simple backend deployment, or consider Railway for quick Node.js hosting.
  - For more advanced setups, use Docker containers and deploy to cloud providers like AWS, Azure, or Google Cloud.
  - Set up CI/CD pipelines with GitHub Actions, GitLab CI, or Bitbucket Pipelines for automated testing and deployment.
  - For large-scale production, consider Kubernetes orchestration.
- **Testing:**
  - Add dedicated test folders for both backend and frontend.
  - Implement unit and integration tests for all deployed features to ensure reliability and maintainability.

### 3. UI/UX Improvements
- **Intuitive Design:**
  - Conduct UX research and usability testing to ensure the app is user-friendly and accessible.
  - Follow best UI/UX practices, including responsive layouts, clear navigation, and accessible color schemes.
  - Use Tailwind CSS for a modern, maintainable, and customizable UI.
- **Continuous Improvement:**
  - Gather user feedback and iterate on the design.
  - Add animations, transitions, and micro-interactions for a great user experience.

---

For more details, see the code comments and documentation in each folder.
