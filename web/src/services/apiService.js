/**
 * This file contains functions for interacting with our API and the Farm Data API
 */

import axios from 'axios';

// Base URLs
const API_BASE_URL = 'http://localhost:3001';
const FARM_API_BASE_URL = 'https://api.farmbrite.com';

// API service for our form API
const formApiService = {
  /**
   * Submit a new form response
   * @param {Object} formData - Form data to submit
   * @returns {Promise} - API response
   */
  submitForm: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error submitting form' };
    }
  },

  /**
   * Get all form responses
   * @returns {Promise} - API response with all form data
   */
  getAllResponses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching form responses' };
    }
  },

  /**
   * Get a form response by ID
   * @param {number} id - ID of the form response to retrieve
   * @returns {Promise} - API response with the requested form data
   */
  getResponseById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching form response' };
    }
  }
};

// API service for the Farm Data API
// Since we don't have actual API access, this is a mock implementation
// In a real application, you would need to register for an API key
const farmDataApiService = {
  /**
   * Get sheep breed information
   * @returns {Promise} - API response with sheep breed data
   */
  getSheepBreeds: async () => {
    // In reality, this would make a call to the Farm Data API
    // For this assessment, we'll return mock data
    return Promise.resolve({
      success: true,
      data: [
        { id: 1, name: 'Suffolk', description: 'A large, black-faced breed known for meat production' },
        { id: 2, name: 'Merino', description: 'Known for producing high-quality wool' },
        { id: 3, name: 'Dorper', description: 'A hardy South African breed that sheds its coat' },
        { id: 4, name: 'Romney', description: 'Dual-purpose breed raised for meat and wool' },
        { id: 5, name: 'Texel', description: 'Known for outstanding muscle development and lean meat' },
        { id: 6, name: 'Corriedale', description: 'Dual purpose breed for both wool and meat' },
        { id: 7, name: 'Hampshire', description: 'Fast growing meat breed with dark faces' },
        { id: 8, name: 'Lincoln', description: 'Known for producing the longest and heaviest fleece' }
      ]
    });
  },
  
  /**
   * Get farm information based on region
   * @param {string} region - Farm region to search
   * @returns {Promise} - API response with farm data
   */
  getFarmInfoByRegion: async (region) => {
    // Mock implementation
    return Promise.resolve({
      success: true,
      data: {
        region: region,
        totalFarms: Math.floor(Math.random() * 1000) + 100,
        sheepPopulation: Math.floor(Math.random() * 100000) + 10000,
        averageFlockSize: Math.floor(Math.random() * 100) + 50,
        topBreeds: ['Suffolk', 'Merino', 'Dorper']
      }
    });
  },
  
  /**
   * Get sheep health recommendations
   * @returns {Promise} - API response with health recommendations
   */
  getHealthRecommendations: async () => {
    // Mock implementation
    return Promise.resolve({
      success: true,
      data: [
        { id: 1, title: 'Vaccination Schedule', content: 'Ensure all sheep are vaccinated against clostridial diseases.' },
        { id: 2, title: 'Parasite Control', content: 'Implement regular deworming program to control internal parasites.' },
        { id: 3, title: 'Nutrition', content: 'Provide balanced nutrition based on production stage.' },
        { id: 4, title: 'Hoof Care', content: 'Check and trim hooves regularly to prevent foot rot.' }
      ]
    });
  }
};

export { formApiService, farmDataApiService };
