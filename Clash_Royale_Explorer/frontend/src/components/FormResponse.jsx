import React from "react";

/**
 * 
 * Displays a single user form response:
 * 
 * @param {string} favCard - User's favorite card
 * @param {number} trophyCount - User's trophy count
 * @param {string} reason - Reason for choosing the favorite card
 */
export default function FormResponse({ favCard, trophyCount, reason }) {
  return (
    <div className="form-response-container">
      <h3>Favourite Card</h3>
      <span>{favCard}</span>
      <h3>Reason</h3>
      <span>{reason}</span>
      <h3>Trophy Count</h3>
      <span>{trophyCount}</span>
    </div>
  );
}
