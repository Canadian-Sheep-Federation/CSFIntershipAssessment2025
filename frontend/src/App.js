/**
 * @file App.jsx
 * @description Root component for the Carma web app
 *
 * Structure:
 *  - Renders a page container with centered layout 
 *
 * Styling:
 *  - Inline styles used for layout (max width, margin, font family)
 */

import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>🚗 Carma 🚗</h1>
      <FeedbackForm />
      <hr />
      <FeedbackList />
    </div>
  );
}

export default App;
