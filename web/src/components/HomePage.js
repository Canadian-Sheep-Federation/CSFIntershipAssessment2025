import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Canadian Sheep Federation</h1>
          <h2>Connecting Sheep Farmers Across Canada</h2>
          <p>
            Welcome to the Canadian Sheep Federation's online platform. 
            We're dedicated to supporting sheep farmers and the sheep industry throughout Canada.
          </p>
          <div className="hero-buttons">
            <Link to="/form" className="btn btn-primary">
              Take Our Survey
            </Link>
            <Link to="/farm-data" className="btn btn-secondary">
              View Farm Data
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Survey Form</h3>
          <p>
            Share your preferences and experiences with different sheep breeds. 
            Your feedback helps us improve our resources and better serve the farming community.
          </p>
          <Link to="/form" className="feature-link">
            Fill Out Survey →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Survey Results</h3>
          <p>
            View responses from sheep farmers across Canada. 
            See which breeds are most popular and learn from other farmers' experiences.
          </p>
          <Link to="/results" className="feature-link">
            View Results →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🐑</div>
          <h3>Farm Data</h3>
          <p>
            Access valuable information about sheep breeds, health recommendations, 
            and regional statistics to help optimize your farming practices.
          </p>
          <Link to="/farm-data" className="feature-link">
            Explore Data →
          </Link>
        </div>
      </section>

      <section className="about">
        <h2>About the Canadian Sheep Federation</h2>
        <p>
          The Canadian Sheep Federation is a national, non-profit organization that represents 
          all Canadian sheep producers. Our mission is to enhance the growth and viability of 
          the Canadian sheep and lamb industry through innovation, promotion, advocacy, and education.
        </p>
        <p>
          We strive to be the collective voice of sheep producers on issues of national importance and 
          work together with government agencies, research institutions, and industry partners to 
          ensure the sustainable development of the sheep industry in Canada.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
