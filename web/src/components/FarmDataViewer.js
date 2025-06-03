import React, { useState, useEffect } from 'react';
import { farmDataApiService } from '../services/apiService';
import './FarmDataViewer.css';

const FarmDataViewer = () => {
  const [breeds, setBreeds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [regionData, setRegionData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('Canada');
  const [loading, setLoading] = useState({
    breeds: true,
    recommendations: true,
    regionData: false
  });
  const [error, setError] = useState({
    breeds: null,
    recommendations: null,
    regionData: null
  });

  // Regions available for search
  const regions = [
    'Canada', 'Alberta', 'British Columbia', 'Manitoba', 
    'New Brunswick', 'Newfoundland', 'Nova Scotia', 'Ontario', 
    'Prince Edward Island', 'Quebec', 'Saskatchewan'
  ];

  // Load sheep breeds and health recommendations when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch sheep breeds
        setLoading(prev => ({ ...prev, breeds: true }));
        const breedsResponse = await farmDataApiService.getSheepBreeds();
        setBreeds(breedsResponse.data || []);
        setError(prev => ({ ...prev, breeds: null }));
      } catch (err) {
        console.error('Error loading sheep breeds:', err);
        setError(prev => ({ ...prev, breeds: 'Failed to load sheep breeds' }));
      } finally {
        setLoading(prev => ({ ...prev, breeds: false }));
      }

      try {
        // Fetch health recommendations
        setLoading(prev => ({ ...prev, recommendations: true }));
        const recommendationsResponse = await farmDataApiService.getHealthRecommendations();
        setRecommendations(recommendationsResponse.data || []);
        setError(prev => ({ ...prev, recommendations: null }));
      } catch (err) {
        console.error('Error loading health recommendations:', err);
        setError(prev => ({ ...prev, recommendations: 'Failed to load health recommendations' }));
      } finally {
        setLoading(prev => ({ ...prev, recommendations: false }));
      }
    };

    fetchInitialData();
  }, []);

  // Handle region selection and data fetching
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleFetchRegionData = async () => {
    if (!selectedRegion) return;

    try {
      setLoading(prev => ({ ...prev, regionData: true }));
      setError(prev => ({ ...prev, regionData: null }));
      
      const response = await farmDataApiService.getFarmInfoByRegion(selectedRegion);
      setRegionData(response.data);
    } catch (err) {
      console.error(`Error fetching data for ${selectedRegion}:`, err);
      setError(prev => ({ ...prev, regionData: `Failed to load data for ${selectedRegion}` }));
      setRegionData(null);
    } finally {
      setLoading(prev => ({ ...prev, regionData: false }));
    }
  };

  return (
    <div className="farm-data-container">
      <h2>Farm Data Resources</h2>
      <p>Access valuable information about sheep breeds, health recommendations, and regional statistics.</p>

      <div className="data-section">
        <h3>Sheep Breeds</h3>
        {loading.breeds && <div className="loading">Loading breeds...</div>}
        {error.breeds && <div className="error-message">{error.breeds}</div>}
        
        {!loading.breeds && !error.breeds && (
          <div className="breeds-grid">
            {breeds.map(breed => (
              <div key={breed.id} className="breed-card">
                <h4>{breed.name}</h4>
                <p>{breed.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="data-section">
        <h3>Health Recommendations</h3>
        {loading.recommendations && <div className="loading">Loading recommendations...</div>}
        {error.recommendations && <div className="error-message">{error.recommendations}</div>}
        
        {!loading.recommendations && !error.recommendations && (
          <div className="recommendations-list">
            {recommendations.map(item => (
              <div key={item.id} className="recommendation-item">
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="data-section">
        <h3>Regional Farm Data</h3>
        <div className="region-selector">
          <select 
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <button 
            onClick={handleFetchRegionData}
            disabled={loading.regionData}
          >
            {loading.regionData ? 'Loading...' : 'Get Data'}
          </button>
        </div>

        {error.regionData && <div className="error-message">{error.regionData}</div>}
        
        {regionData && !error.regionData && (
          <div className="region-data">
            <h4>{regionData.region} Sheep Farming Statistics</h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{regionData.totalFarms.toLocaleString()}</div>
                <div className="stat-label">Sheep Farms</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{regionData.sheepPopulation.toLocaleString()}</div>
                <div className="stat-label">Sheep Population</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{regionData.averageFlockSize}</div>
                <div className="stat-label">Avg. Flock Size</div>
              </div>
            </div>
            
            <div className="top-breeds">
              <h5>Top Breeds in Region:</h5>
              <ul>
                {regionData.topBreeds.map((breed, index) => (
                  <li key={index}>{breed}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmDataViewer;
