'use client';

import { useEffect, useState } from 'react';
import { backendApi } from '../shared/api/backendApi';
import '../styles/Response.css';
import '../index.css';
import type { Submission } from '../entities/submission/types';

export default function ResponsesPage() {
  // State for all responses, loading status, and error message
  const [responses, setResponses] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all survey responses from the backend
  const fetchResponses = async () => {
    try {
      setIsLoading(true);
      setError('');
      // Use backendApi to get all submissions
      const res = await backendApi.get('/');
      setResponses(res.data);
    } catch (err) {
      console.error('Error fetching responses:', err);
      setError('Failed to load responses. Please try again.');
      setResponses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch responses on component mount
  useEffect(() => {
    fetchResponses();
  }, []);

  if (isLoading) {
    return (
      <main className="responses-container">
        <h1 className="responses-title loading">All GIF Mood Survey Responses</h1>
        <p className="loading">Loading responses...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="responses-container">
        <h1 className="responses-title">All GIF Mood Survey Responses</h1>
        <div className="error-container">
          <p className="error">{error}</p>
          <button onClick={fetchResponses} className="retry-button">
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="responses-container">
      <h1 className="responses-title">All GIF Mood Survey Responses</h1>
      {/* List all responses or show a message if none exist */}
      {responses.length === 0 ? (
        <p className="no-responses">No responses yet.</p>
      ) : (
        <div className="responses-list">
          {responses.map(res => (
            <div key={res._id} className="response-card">
              <img src={res.gif_url} alt="Submitted GIF" className="response-gif" />
              <p className="response-text"><strong>Mood:</strong> {res.mood_category}</p>
              <p className="response-text"><strong>Rating:</strong> {res.mood_rating}/5</p>
              {res.comment && (
                <p className="response-text"><strong>Comment:</strong> {res.comment}</p>
              )}
              <p className="response-timestamp">{new Date(res.createdAt).toLocaleString()}</p>
              <p className="response-id"><strong>ID:</strong> {res._id}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}