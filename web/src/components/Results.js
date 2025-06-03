import React, { useState, useEffect } from 'react';
import { formApiService } from '../services/apiService';
import './Results.css';

const Results = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all form responses when component mounts
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const result = await formApiService.getAllResponses();
        setResponses(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching responses:', err);
        setError('Failed to load survey responses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="results-container">
      <h2>Survey Responses</h2>
      
      {loading && <div className="loading">Loading responses...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && responses.length === 0 && (
        <div className="no-data">No responses submitted yet.</div>
      )}
      
      {!loading && !error && responses.length > 0 && (
        <div className="responses-list">
          {responses.map(response => (
            <div key={response.id} className="response-card">
              <div className="response-header">
                <h3>{response.name}</h3>
                <span className="date">{formatDate(response.created_at)}</span>
              </div>
              
              <div className="response-details">
                <p>
                  <strong>Email:</strong> {response.email}
                </p>
                <p>
                  <strong>Favorite Breed:</strong> {response.favorite_breed}
                </p>
                <p>
                  <strong>Knowledge Rating:</strong> 
                  <span className="rating">{response.rating}/10</span>
                </p>
                
                {response.comments && (
                  <div className="comments">
                    <strong>Comments:</strong>
                    <p>{response.comments}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
