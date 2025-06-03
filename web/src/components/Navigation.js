import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Canadian Sheep Federation</h1>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/form" className={({isActive}) => isActive ? 'active' : ''}>
              Survey Form
            </NavLink>
          </li>
          <li>
            <NavLink to="/results" className={({isActive}) => isActive ? 'active' : ''}>
              Survey Results
            </NavLink>
          </li>
          <li>
            <NavLink to="/farm-data" className={({isActive}) => isActive ? 'active' : ''}>
              Farm Data
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
