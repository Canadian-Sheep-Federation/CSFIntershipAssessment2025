/**
 * @file FeedbackList.jsx
 * @description React component that displays a list of all submitted vehicle feedback
 *
 * Features:
 *  - Fetches all feedback entries from the backend API on component mount
 *  - Displays each feedback as a styled card with:
 *      - Make, model, year
 *      - Star-based visual rating (★)
 *      - User comment
 *      - Submission timestamp
 *  - Gracefully handles the empty state (no feedback yet)
 *
 * Hooks:
 *  - useState: for storing feedback list
 *  - useEffect: for fetching data once when mounted
 *
 * Dependencies:
 *  - axios: for API call
 *  - CSS file: FeedbackList.css for styling feedback cards
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackList.css";

const FeedbackList = () => {
  // hook to update feedback
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // get call to get all the feedback
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(res.data);
      } catch (err) {
        // simple error handling
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedbacks();
    // load once everything is mounted
  }, []);

  return (
    <div className="feedback-container">
      <h2>All Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div className="feedback-card" key={fb._id}>
            <h3 className="feedback-title">
              {fb.year || "Year"} {fb.make?.toUpperCase()} {fb.model}
            </h3>

            <div className="feedback-rating">
              <strong>Rating:</strong> {"★".repeat(fb.rating)}
              {"☆".repeat(5 - fb.rating)} ({fb.rating}/5)
            </div>

            <p className="feedback-comment">{fb.comment}</p>

            <div className="feedback-date">
              Submitted on {new Date(fb.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
