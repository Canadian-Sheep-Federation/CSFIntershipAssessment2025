import React from "react";
import { NavLink } from "react-router-dom";

/**
 * 
 * Simple navigation bar with links to:
 * - Browse Cards page
 * - Survey form page
 */
export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/browse-cards">
        <p>Browse Cards</p>
      </NavLink>
      <NavLink to="/">
        <p>Survey!</p>
      </NavLink>
    </div>
  );
}
