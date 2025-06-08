'use client';

import { useEffect, useState } from 'react';
import GifSurveyForm from '../widgets/GifSurveyForm.tsx';
import { fetchGif } from '../shared/api/backendApi';
import '../styles/HomePage.css';

export default function Home() {
  // State for the current GIF URL and loading status
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoadingGif, setIsLoadingGif] = useState<boolean>(false);

  // Array of moods to cycle through for variety in GIFs
  const moods = ['happy', 'sad', 'excited', 'calm', 'surprised', 'funny'];
  
  // Function to load a new GIF from the API
  const loadNewGif = async () => {
    setIsLoadingGif(true);
    try {
      // Pick a random mood from the array for variety
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const newGifUrl = await fetchGif(randomMood);
      setGifUrl(newGifUrl);
    } catch (error) {
      console.error('Failed to load new GIF:', error);
      // Fallback to happy mood if random mood fails
      try {
        const fallbackGifUrl = await fetchGif('happy');
        setGifUrl(fallbackGifUrl);
      } catch (fallbackError) {
        console.error('Fallback GIF also failed:', fallbackError);
      }
    } finally {
      setIsLoadingGif(false);
    }
  };

  // Load initial GIF on component mount
  useEffect(() => {
    loadNewGif();
  }, []);

  // Handler for requesting a new GIF (passed to the form)
  const handleNewGifRequest = () => {
    loadNewGif();
  };

  // Show loading state while GIF is being fetched
  if (!gifUrl && isLoadingGif) {
    return (
      <div className="home-container">
        <h1 className="responses-title loading">GIF Mood Survey</h1>
        <div className="loading-message">Loading GIF...</div>
      </div>
    );
  }

  // Show error state if GIF failed to load
  if (!gifUrl) {
    return (
      <div className="home-container">
        <h1 className="responses-title error">GIF Mood Survey</h1>
        <div className="error-message">Failed to load GIF. Please refresh the page.</div>
      </div>
    );
  }

  // Main survey UI
  return (
    <div className="home-container">
      {/* Survey title, with loading style if GIF is loading */}
      <h1 className={`responses-title${isLoadingGif ? ' loading' : ''}`}>GIF Mood Survey</h1>
      
      {/* Overlay while loading a new GIF */}
      {isLoadingGif && (
        <div className="loading-overlay">
          <div className="loading-overlay-content loading-message">
            Loading new GIF...
          </div>
        </div>
      )}
      
      {/* Survey form for user input */}
      <div className="survey-form-container">
        <GifSurveyForm 
          gifUrl={gifUrl} 
          onNewGifRequest={handleNewGifRequest}
        />
      </div>
      
      {/* Button to fetch a new GIF manually */}
      <button 
        onClick={loadNewGif}
        disabled={isLoadingGif}
        className="new-gif-button"
      >
        {isLoadingGif ? 'Loading...' : 'Get New GIF'}
      </button>
    </div>
  );
}