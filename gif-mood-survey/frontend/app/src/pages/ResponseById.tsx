import { useState } from 'react';
import { backendApi } from '../shared/api/backendApi';
import type { Submission } from '../entities/submission/types';
import '../styles/ResponseById.css';

export default function ResponseByIdPage() {
  // States for the input ID, fetched response, error message, and loading status
  const [id, setId] = useState('');
  const [response, setResponse] = useState<Submission | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch a submission by its ID from the backend
  const fetchById = async () => {
    if (!id.trim()) {
      setError('Please enter an ID');
      return;
    }

    setIsLoading(true);
    setError(''); 

    try {
      // Use backendApi to get the submission by ID
      const res = await backendApi.get(`/${id}`);
      setResponse(res.data);
    } catch {
      setResponse(null); 
      setError('Not found or invalid ID.');
    } finally {
      setIsLoading(false);
    }
  };

  // Allow pressing Enter to trigger the fetch
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchById();
    }
  };

  return (
    <div className="response-by-id-page">
      <h2>🔍 Find a Submission by ID</h2>
      
      {/* Input for submission ID and fetch button */}
      <div className="search-section">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter submission ID"
          disabled={isLoading}
        />
        <button onClick={fetchById} disabled={isLoading || !id.trim()}>
          {isLoading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {/* Show error if any */}
      {error && <p className="error">{error}</p>}

      {/* Show the fetched response if available */}
      {response && (
        <div className="response-card">
          <img src={response.gif_url} alt="GIF" className="response-gif" />
          <p><strong>Mood:</strong> {response.mood_category}</p>
          <p><strong>Rating:</strong> {response.mood_rating}/5</p>
          {response.comment && <p><strong>Comment:</strong> {response.comment}</p>}
          <p><em>{new Date(response.createdAt).toLocaleString()}</em></p>
        </div>
      )}
    </div>
  );
}