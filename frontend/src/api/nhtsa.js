/**
 * @file nhtsa.js
 * @description Utility functions for fetching vehicle data from the NHTSA Vehicle API
 *
 * Exports:
 *  - getAllMakes:    Fetches all car makes, filters to popular ones, and sorts alphabetically
 *  - getModelsForMake: Given a make name (e.g. "Toyota"), fetches its list of models
 *
 * Uses:
 *  - Public API: https://vpic.nhtsa.dot.gov/api/
 *  - Popular makes list is hardcoded and used to filter results
 */

import axios from "axios";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

// array of popular car makes to filter makes from the api
const POPULAR_MAKES = [
  "acura",
  "audi",
  "aston martin",
  "bentley",
  "bmw",
  "bugatti",
  "cadillac",
  "chevrolet",
  "dodge",
  "ferrari",
  "ford",
  "honda",
  "hyundai",
  "jeep",
  "kia",
  "koenigsegg",
  "lamborghini",
  "lexus",
  "mazda",
  "mclaren",
  "mercedes-benz",
  "nissan",
  "pagani",
  "porsche",
  "rolls-royce",
  "subaru",
  "tesla",
  "toyota",
  "volkswagen",
]; // alphabetical order

// fetch all car makes
export const getAllMakes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/GetAllMakes?format=json`);
    // ensure that only popular makes are displayed
    return res.data.Results.filter((make) =>
      POPULAR_MAKES.includes(make.Make_Name.toLowerCase())
    ).sort((a, b) => a.Make_Name.localeCompare(b.Make_Name)); // sort final list alphabetically
  } catch (err) {
    console.error("error fetching makes from NHTSA:", err); // simple error handling
    return [];
  }
};

// this fetches models for a specific make from the previous fetch
export const getModelsForMake = async (makeName) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/GetModelsForMake/${makeName}?format=json`
    );
    return res.data.Results; // array of model id, and model name
  } catch (err) {
    console.error("error fetching models:", err); // simple error handling
    return [];
  }
};
