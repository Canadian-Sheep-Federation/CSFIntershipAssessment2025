/**
 * @file FeedbackForm.jsx
 * @description React component for submitting vehicle feedback
 *
 * Features:
 *  - Fetches car makes from the NHTSA API and filters to the most popular ones (the cars seen on modern roads)
 *  - Dynamically loads models based on selected make
 *  - Allows user to select year, give a 1-5 rating, and leave a comment
 *  - Submits the form to the backend (MongoDB via Express API)
 *  - Displays a Google Image Search link to preview the selected vehicle
 *
 * Hooks:
 *  - useEffect: to fetch makes on mount and models on make change
 *  - useState: for form state, makes list, models list
 *
 * Dependencies:
 *  - axios: for HTTP requests
 *  - getAllMakes / getModelsForMake: utility functions in api/nhtsa.js
 */

import React, { useEffect, useState } from "react";
import { getAllMakes, getModelsForMake } from "../api/nhtsa";
import axios from "axios";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  // states for make, and models and for the form
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    rating: 5,
    comment: "",
  });

  // hook to fetch all the makes and set them
  useEffect(() => {
    const fetchMakes = async () => {
      const data = await getAllMakes();
      setMakes(data);
    };
    fetchMakes();
  }, []);

  // hook to fetch all moels and set them whenever make component is modified
  useEffect(() => {
    if (!form.make) return;
    const fetchModels = async () => {
      const data = await getModelsForMake(form.make);
      setModels(data);
    };
    fetchModels();
  }, [form.make]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // when 'submitted', make a POST call and use state hook to update the form and add it to the reviews
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      alert("feedback submitted"); // temp alert
      setForm({ make: "", model: "", rating: 5, comment: "" });
      setModels([]);
    } catch (err) {
      // basic error handling
      alert("error submitting feedback");
    }
  };
  return (
    <div className="feedback-form">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Make:
          <select
            name="make"
            value={form.make}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Make --</option>
            {makes.map((make) => (
              <option key={make.Make_ID} value={make.Make_Name.toLowerCase()}>
                {make.Make_Name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Model:
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Model --</option>
            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_Name}>
                {model.Model_Name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          >
            {Array.from({ length: 35 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Rating:
          <input
            type="range"
            min="1"
            max="5"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
          <strong>{form.rating}/5</strong>
        </label>

        <label>
          Comment:
          <textarea
            name="comment"
            placeholder="Share your thoughts..."
            value={form.comment}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>
        {form.make && form.model && form.year && (
          <div style={{ marginTop: "1rem" }}>
            <h3>View Car Image</h3>
            {/* simple image search for the picture of the vehicle */}
            <a
              href={`https://www.google.com/search?tbm=isch&q=${form.year}+${form.make}+${form.model}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Click here to view {form.year} {form.make} {form.model} on Google
              Images
            </a>
          </div>
        )}

        <button type="submit" style={{ padding: "0.5rem", fontWeight: "bold" }}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
