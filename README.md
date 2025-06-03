# Canadian Sheep Federation Internship Assessment

This project satisfies the requirements for the Canadian Sheep Federation Software Developer Internship Assessment. It consists of:

1. A RESTful API that stores form data in a SQLite database
2. A web application that consumes both the API and a Farm Data API for sheep breeding information

## Project Structure

The project is divided into two main components:

- `/api`: Backend API built with Node.js, Express, and SQLite
- `/web`: Frontend application built with React

## Running the Application

### Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)

### Starting the API Server

```bash
cd api
npm install
npm start
```

The API server will start on port 3001 and will be accessible at http://localhost:3001.

### Starting the Web Application

```bash
cd web
npm install
npm start
```

The web application will start on port 3000 and will automatically open in your browser at http://localhost:3000.

## Features

### API Endpoints

- `POST /`: Submit a new form response
- `GET /`: Retrieve all form responses
- `GET /:id`: Retrieve a specific form response by ID

### Web Application

- **Home Page**: Overview of the application
- **Form**: Submit preferences about sheep breeds
- **Results**: View submitted form responses
- **Farm Data**: View information from the Farm Data API about sheep breeds, health recommendations, and regional statistics

## Technical Stack

- **Backend**: Node.js, Express, SQLite
- **Frontend**: React, React Router, Axios
- **Styling**: CSS

## Implementation Details

The application implements all the required components:

1. A RESTful API with proper endpoint handling and data storage
2. A web application that consumes the API and a public API
3. Form functionality with multiple fields that mesh well with the public API

The Farm Data API integration is simulated with mock data for demonstration purposes.

## Extension and Improvement Opportunities

### API Enhancements
- **Authentication**: Implement JWT-based authentication for secure access
- **Advanced Endpoints**: Add filtering, pagination, and sorting capabilities
- **Data Model Expansion**: Extend the schema to include user profiles, breeding records, and farm management data
- **Validation**: Implement comprehensive input validation and error handling
- **API Documentation**: Add Swagger/OpenAPI documentation

### Web Application Improvements
- **Data Visualization**: Implement interactive charts for sheep population and breed statistics
- **Offline Support**: Add service workers for offline capabilities
- **Advanced Form Features**: File uploads for sheep images, multi-step form processes
- **Real-time Updates**: Implement WebSocket connections for live data updates
- **Mobile Responsiveness**: Optimize further for various device sizes

## Deployment Strategy

### Backend API Deployment
- **Production Environment**: Deploy to a Node.js-friendly service like Heroku, Render, or DigitalOcean App Platform
- **Database Migration**: Replace SQLite with PostgreSQL for better scalability in production
- **Environment Configuration**: Use environment variables for configuration management
- **Process Management**: Implement PM2 or similar for Node.js process management

### Frontend Deployment
- **Static Hosting**: Deploy built React application to Netlify, Vercel, or AWS S3
- **CDN Integration**: Set up content delivery network for global performance
- **Environment-specific Builds**: Configure different API endpoints for dev/staging/production

### CI/CD Pipeline
- Implement automated testing and continuous deployment workflows
- Set up staging environments for pre-production testing

## Intuitive Design and User Interface

The application focuses on a clean, intuitive user interface with:

- **Consistent Design System**: Uniform color scheme, typography, and component styling
- **Responsive Design**: Adapts to various screen sizes from mobile to desktop
- **Clear Navigation**: Intuitive menu structure for easy access to all features
- **Informative Feedback**: Success/error messages for user actions
- **Accessibility**: Semantic HTML structure and appropriate contrast for readability

Further UI improvements could include:
- Improved loading states with skeleton screens
- Enhanced data visualization for farm statistics
- Guided tour for first-time users
- Dark mode option for reduced eye strain
