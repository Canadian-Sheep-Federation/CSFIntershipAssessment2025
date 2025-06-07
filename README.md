# Cat Facts Feedback App

## Overview

This project is a web application that allows users to discover and rate fascinating cat facts. It consists of a REST-ful API that stores user feedback in a SQLite database and a web application that interacts with both this API and the Meowfacts API to fetch cat facts.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Web Application](#web-application)
- [Extensions and Improvements (Bonus Points)](#extensions-and-improvements-bonus-points)
- [Deployment (Bonus Points)](#deployment-bonus-points)
- [Intuitive Design and User Interface (Bonus Points)](#intuitive-design-and-user-interface-bonus-points)
- [What I Don't Know / Areas for Further Learning](#what-i-dont-know--areas-for-further-learning)


## Project Structure

The project is organized into two main directories:

  - `backend/`: Contains the Node.js Express API and SQLite database setup.
  - `frontend/`: Contains the static HTML, CSS, and JavaScript for the web application.

<!-- end list -->

```
.
├── backend/
│   ├── db.js          # SQLite database connection and schema
│   └── server.js      # Node.js Express API
├── frontend/
│   ├── index.html     # Main HTML page
│   ├── main.js        # Frontend JavaScript logic
│   └── style.css      # Styling for the web application
└── README.md          # This file
```

## Installation

To get the project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AhmadAljawish/CSFInternshipAssessment2025.git
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd CSFInternshipAssessment2025/backend
    ```
3.  **Install backend dependencies:**
    ```bash
    npm install express cors body-parser sqlite3
    ```
4.  **Start the backend server:**
    ```bash
    node server.js
    ```
    You should see `✅ Server running at http://localhost:3000` in your console.

## Usage

1.  **Open the web application:**
    With the backend server running, open your web browser and go to `http://localhost:3000`.
2.  **Interact with the app:**
      * A cat fact will be loaded from the Meowfacts API.
      * You can rate the fact (1-5) and add optional comments.
      * Submit your feedback.
      * View all previously submitted feedback at the bottom of the page.
      * A new cat fact will automatically load after each submission.

## API Endpoints

The API is built using Node.js with Express and stores data in a SQLite database. All endpoints are prefixed with `/api`.

### `POST /api`

  - **Description**: Receives user feedback for a cat fact and stores it in the database.
  - **Request Method**: `POST`
  - **Request Body**: `application/json`
    ```json
    {
        "fact": "Cats can make over 100 different sounds...",
        "rating": 4,
        "comment": "Very interesting fact!"
    }
    ```
  - **Success Response**: `201 Created`
    ```json
    {
        "id": 1
    }
    ```
    Returns the ID of the newly created feedback entry.
  - **Error Response**: `400 Bad Request` if `fact` or `rating` are missing. `500 Internal Server Error` on database error.

### `GET /api`

  - **Description**: Retrieves all submitted feedback entries from the database.
  - **Request Method**: `GET`
  - **Success Response**: `200 OK`
    ```json
    [
        {
            "id": 1,
            "fact": "Cats can make over 100 different sounds...",
            "rating": 4,
            "comment": "Very interesting fact!"
        },
        {
            "id": 2,
            "fact": "The average cat sleeps 70% of its life.",
            "rating": 5,
            "comment": "So true!"
        }
    ]
    ```
    Returns an array of all feedback objects, ordered by newest first.
  - **Error Response**: `500 Internal Server Error` on database error.

### `GET /api/:id`

  - **Description**: Retrieves a specific feedback entry by its ID.
  - **Request Method**: `GET`
  - **URL Parameters**: `id` (integer) - The ID of the feedback entry to retrieve.
  - **Success Response**: `200 OK`
    ```json
    {
        "id": 1,
        "fact": "Cats can make over 100 different sounds...",
        "rating": 4,
        "comment": "Very interesting fact!"
    }
    ```
  - **Error Responses**:
      * `404 Not Found` if no feedback entry matches the given ID.
      * `500 Internal Server Error` on database error.

## Web Application

The frontend is a single-page application built with plain HTML, CSS, and JavaScript.

  - **Public API Integration**: Fetches cat facts from the [Meowfacts API](https://github.com/wh-iterabb-it/meowfacts).
  - **Form Submission**: Allows users to input a rating and optional comment for the displayed cat fact.
  - **Feedback Display**: Dynamically loads and displays all submitted feedback from the custom API.
  - **Dynamic Fact Loading**: A new cat fact is loaded after each feedback submission.

## Extensions and Improvements (Bonus Points Discussion)

To make this application more robust, scalable, and user-friendly, here are several potential extensions and improvements:

### A. Web Application (Frontend) Enhancements

1.  **Interactive Star Rating:** Replace the numerical dropdown with a visual star rating component for a more intuitive user experience.
2.  **Enhanced User Feedback:** Implement in-app notifications (e.g., toast messages) for success and error messages instead of basic `alert()` calls. Include loading indicators (spinners) during API calls.
3.  **"New Fact" Button:** Add a dedicated button to explicitly fetch a new cat fact, allowing users to browse facts before submitting feedback.
4.  **Filtering & Sorting Feedback:** Introduce options to filter feedback by rating, search comments/facts by keywords, and sort by date or rating. This would require corresponding API enhancements.
5.  **Client-Side Form Validation:** Implement more comprehensive JavaScript validation before submitting the form to the backend, providing immediate feedback to the user.

### B. API (Backend) Enhancements

1.  **Robust Input Validation:** Beyond basic checks, implement more granular validation for rating (e.g., must be an integer between 1 and 5) and comment length.
2.  **Pagination for `GET /api`:** For performance and scalability with a large number of feedback entries, implement pagination (e.g., `GET /api?page=1&limit=10`).
3.  **Analytics Endpoints:** Add new API endpoints to provide aggregated data, such as:
      * `GET /api/stats/average-rating`: Calculates the average rating across all facts.
      * `GET /api/stats/top-facts`: Identifies facts with the highest average ratings.
4.  **API Rate Limiting:** Implement middleware to limit the number of requests a single client can make within a certain timeframe to prevent abuse.
5.  **User Authentication & Authorization:** Introduce user accounts to enable personalized feedback, allowing users to view/edit only their own submissions. This would move beyond the current scope but is a common improvement.

## Deployment (Bonus Points Discussion)

A robust deployment strategy ensures the application is reliable, scalable, and accessible.

### A. Backend Deployment (Node.js/Express with SQLite)

1.  **Cloud Provider Choice:**
      * **Single Instance Host (e.g., DigitalOcean Droplet, Linode, AWS EC2):** This is well-suited for SQLite, as the database file can persist on the server's disk. A process manager like `PM2` would be used to keep the Node.js application running.
      * **Managed PaaS (e.g., Heroku, Render.com, AWS Elastic Beanstalk, Google Cloud Run):** While simpler to deploy Node.js apps, using SQLite directly might be challenging due to ephemeral filesystems. For these platforms, it's generally recommended to switch to a network-based database (like **MongoDB Atlas**, PostgreSQL, or MySQL) that offers managed services.
2.  **Database Migration (if switching from SQLite):** If moving to a relational database like PostgreSQL, database migration tools (e.g., `Knex.js`, `TypeORM` migrations) would be essential to manage schema changes.
3.  **Environment Variables:** Crucial for managing sensitive information (e.g., database connection strings) and configuration settings across different environments (development, production).

### B. Frontend Deployment (Static Files)

1.  **Static Site Hosting:** The frontend consists of static HTML, CSS, and JavaScript, making it ideal for static site hosts.
      * **Netlify / Vercel:** Highly recommended for their ease of use, integrated CI/CD, free SSL, and global Content Delivery Networks (CDNs). Simply connect your Git repository.
      * **GitHub Pages:** A free and simple option for basic projects hosted directly from a GitHub repository.
      * **AWS S3 + CloudFront:** For more granular control, cost-effectiveness at scale, and robust global content delivery.

### C. General Deployment Best Practices

1.  **HTTPS:** Essential for all production environments to ensure secure communication. Most cloud providers and static site hosts offer free SSL certificates.
2.  **CI/CD Pipeline:** Implement a Continuous Integration/Continuous Deployment pipeline (e.g., GitHub Actions) to automate testing and deployment whenever changes are pushed to the repository.
3.  **Monitoring and Logging:** Set up comprehensive logging (e.g., using a library like Winston for Node.js) and integrate with monitoring services (e.g., Prometheus, Grafana, AWS CloudWatch) to track application health and performance in production.

## Intuitive Design and User Interface (Bonus Points Discussion)

The application currently focuses on a clean, modern design. Further enhancements to intuitiveness include:

  * **Visual Hierarchy:** Ensuring that important elements (like the current fact and submit button) stand out clearly.
  * **Whitespace:** Effective use of negative space to reduce clutter and improve readability.
  * **Consistency:** Maintaining a consistent visual style (colors, fonts, spacing) across all elements.
  * **Feedback Loops:** Providing clear and immediate visual feedback for user actions (e.g., button presses, loading states, form validation errors).

## What I Don't Know / Areas for Further Learning

As an intern, I am continuously learning. Here are some areas that would require further exploration for a production-ready application:

  * **Database Migrations:** While SQLite is used, understanding how to implement formal database migrations (e.g., using a tool like `Knex.js` or `Sequelize` for relational databases) to manage schema changes over time would be crucial.
  * **Comprehensive Testing:** Writing unit, integration, and end-to-end tests for both the API (e.g., using `Mocha`/`Chai`/`Jest`) and the web application (e.g., using `Cypress` or `Playwright`) to ensure robustness and prevent regressions.
  * **Advanced Security Best Practices:** A deeper dive into protecting against common web vulnerabilities such as SQL injection (beyond basic prepared statements), Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and proper session management. Utilizing security middleware like `helmet` in Express for various HTTP header protections.
  * **Advanced Error Handling:** Implementing a centralized error handling strategy in the API, distinguishing between operational and programming errors, and sending appropriate error responses.