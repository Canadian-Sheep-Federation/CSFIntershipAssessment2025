import React, { useState, useEffect } from 'react';
import { formApiService, farmDataApiService } from '../services/apiService';
import './Form.css';

const Form = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favorite_breed: '',
    rating: 5,
    comments: ''
  });
  
  // Form submission status
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });
  
  // Sheep breeds from Farm Data API
  const [sheepBreeds, setSheepBreeds] = useState([]);
  
  useEffect(() => {
    // Load sheep breeds from Farm Data API when component mounts
    const loadBreeds = async () => {
      try {
        const response = await farmDataApiService.getSheepBreeds();
        setSheepBreeds(response.data || []);
      } catch (error) {
        console.error('Error loading sheep breeds:', error);
      }
    };
    
    loadBreeds();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: ''
    });
    
    try {
      const response = await formApiService.submitForm(formData);
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        message: 'Thank you for your submission!'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        favorite_breed: '',
        rating: 5,
        comments: ''
      });
      
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || 'An error occurred. Please try again.'
      });
    }
  };
  
  return (
    <div className="form-container">
      <h2>Sheep Breed Preferences Survey</h2>
      <p>Please share your thoughts about sheep breeds to help us improve our resources.</p>
      
      {formStatus.isSuccess && (
        <div className="success-message">
          {formStatus.message}
        </div>
      )}
      
      {formStatus.isError && (
        <div className="error-message">
          {formStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="favorite_breed">Favorite Sheep Breed *</label>
          <select
            id="favorite_breed"
            name="favorite_breed"
            value={formData.favorite_breed}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a breed --</option>
            {sheepBreeds.map(breed => (
              <option key={breed.id} value={breed.name}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="rating">Rate your knowledge of sheep breeds (1-10)</label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={formData.rating}
            onChange={handleChange}
          />
          <div className="rating-value">{formData.rating}</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            placeholder="Share any additional thoughts about sheep breeds or the industry..."
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={formStatus.isSubmitting}
        >
          {formStatus.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Form;
