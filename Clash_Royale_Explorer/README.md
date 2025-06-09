Clash Royale Card Explorer
A full-stack web application to browse Clash Royale cards, participate in surveys about favorite cards, and view user responses. The app uses a React frontend, Express backend, and MongoDB for data storage. It integrates the official Clash Royale API for live card and challenge data.

Features
Browse detailed Clash Royale cards fetched from the official API

Submit survey responses about your favorite Clash Royale card

View other users’ survey submissions

RESTful backend API with Express and MongoDB

Frontend built with React and React Router

Getting Started
Prerequisites
Node.js and npm installed

MongoDB Atlas account or local MongoDB

Clash Royale API key (sign up at https://developer.clashroyale.com/)

How to setup after cloning repo:

1. Setup backend
   a. cd backend
   b. npm install

2. Create a .env file in the backend (use .env.example as a template)

3. Run backend server
   a. npm run dev

4. Setup frontend
   a. In new terminal, do cd ../frontend
   b. npm install
   c. npm run dev

5. Open your browser and visit http://localhost:5173 (or whichever port its running on) to use the React app.

Extending and Improving the Application and API:

I could implement user accounts with login/signup functionality so users can save their survey responses, track submissions, and personalize their experience. I can allow users to edit or delete their survey responses and add more detailed survey questions (e.g., rank multiple favorite cards, add comments). I can and will improve the card browsing by adding filters (rarity, elixir cost, max level) and sorting options for a more powerful user experience. Also I want to have a rating system where I can rate the best cards based on the users' forms. this will have an area to explain why, and the way I would write that section is input all the users' reasoning into
an AI API and tell it to summarize and highlight key points, then I will put that paragraph into the rankings. I 
also could make the app look better and tweak some of the frontend.

How the App Should be Deployed.

Backend Deployment:
    - Deploy the Express API to platforms like Heroku, DigitalOcean App Platform, or AWS Elastic Beanstalk.
    - Use environment variables (e.g., for API keys and MongoDB URIs) to keep sensitive info secure.
    - Set up MongoDB Atlas for a cloud-hosted database
Frontend Deployment:
    - Deploy the React app separately using services like Vercel or Netlify.
    - Configure the frontend to use the deployed backend API URLs.
    - Use HTTPS for security and configure proper CORS headers on the backend.
CI/CD Pipeline:
    - Make testing and deployment automatic with GitHub Actions, Travis CI, or CircleCI.

Intuitive Design and User Interface
    - Keep the interface simple with clear navigation so users can easily browse cards or complete surveys without confusion.
    - Use a consistent color palette inspired by Clash Royale’s theme.
    - Use CSS media queries to get responsive web designs so that people could use on smaller devices
