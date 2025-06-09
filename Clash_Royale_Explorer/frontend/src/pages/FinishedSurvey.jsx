import React from "react";
import FormResponse from "../components/FormResponse";
import { useLoaderData } from "react-router-dom";

/**
 *
 * - Displays a thank-you message after form submission.
 * - Shows a list of all previous form responses using the FormResponse component.
 */
export default function FinishedSurvey() {
  const surveysData = useLoaderData(); // Loaded survey responses

  return (
    <div className="finished-survey-container">
      <h1>Thank You For Submitting the Form!</h1>
      <p>View Other Users' Responses Below!</p>
      <div className="survey-responses-container">
        {surveysData.map((surveyData, index) => (
          <FormResponse
            key={`Form Response ${index + 1}`}
            reason={surveyData.reason}
            trophyCount={surveyData.trophyNumber}
            favCard={surveyData.favCard}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Loader function for FinishedSurvey route.
 * Fetches all stored form responses from the backend API.
 */
export async function finishedSurveyLoader() {
  const result = await fetch("http://localhost:4000/api/form-responses");
  return result.json();
}
