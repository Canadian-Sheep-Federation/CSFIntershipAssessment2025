import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Checks if a given card name exists in the Clash Royale API response.
 * @param {string} cardName - Name of the card entered by the user.
 * @returns {boolean|null} - True if the card exists, false otherwise, null if there's an error.
 */
async function doesCardExist(cardName) {
  try {
    const result = await fetch("http://localhost:4000/api/clash-royale/cards");
    const data = await result.json();

    for (let item of data.items) {
      if (cardName.toLowerCase() === item.name.toLowerCase()) {
        return true;
      }
    }

    for (let supportItem of data.supportItems) {
      if (cardName.toLowerCase() === supportItem.name.toLowerCase()) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return null;
  }
}

/**
 * Finds the highest formID in the stored form responses.
 * @returns {number|null} - Max ID found or null if there's an error.
 */
async function findMaxID() {
  try {
    const result = await fetch("http://localhost:4000/api/form-responses");
    const data = await result.json();
    let max = 0;
    if (!data) {
      return max;
    }
    for (let formResponse of data) {
      if (formResponse.formID > max) {
        max = formResponse.formID;
      }
    }
    return max;
  } catch (error) {
    console.error("Error fetching form responses:", error);
    return null;
  }
}

/**
 *
 * Renders a form to collect user input:
 * - Favorite card name
 * - Trophy count
 * - Reason why it’s their favorite
 * Validates input and submits data to the backend.
 */
export default function Survey() {
  let [reason, setReason] = useState("");
  let [trophyCount, setTrophyCount] = useState(0);
  let [favCard, setFavCard] = useState("");
  let [submitPressed, setSubmitPressed] = useState(false);
  let [favCardErr, setFavCardErr] = useState("hidden");
  let [favCardErrMessage, setFavCardErrMessage] = useState(
    "Enter Your Favourite Card"
  );

  const navigate = useNavigate();

  return (
    <div className="survey-container">
      <div className="form">
        <h1>Favourite Card Form</h1>

        <input
          onInput={(event) => setFavCard(event.target.value)}
          type="text"
          placeholder="Enter Your Favourite Card!"
        />
        <p className="form-error-warnings" style={{ visibility: favCardErr }}>
          {favCardErrMessage}
        </p>

        <input
          onInput={(event) => setTrophyCount(event.target.value)}
          type="number"
          placeholder="Enter Your Trophy Count"
          step={50}
        />
        <p
          className="form-error-warnings"
          style={{
            visibility:
              trophyCount === "" && submitPressed ? "visible" : "hidden",
          }}
        >
          Enter Your Trophy Count!
        </p>

        <textarea
          onInput={(event) => setReason(event.target.value)}
          className="fav-card-reason"
          placeholder="Enter Your Reasoning For Why the Card is Your Favourite"
        ></textarea>
        <p
          className="form-error-warnings"
          style={{
            visibility: reason === "" && submitPressed ? "visible" : "hidden",
          }}
        >
          Enter Your Reason Why
        </p>

        <button
          onClick={async () => {
            setSubmitPressed(true);

            let prevMaxID = await findMaxID();
            let newMaxID = prevMaxID + 1;
            let cardExistsNow = await doesCardExist(favCard);

            if (
              reason !== "" &&
              favCard !== "" &&
              trophyCount != 0 &&
              cardExistsNow
            ) {
              // Submit the form
              fetch("http://localhost:4000/api/form-responses", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  formID: newMaxID,
                  trophyNumber: trophyCount,
                  favCard: favCard,
                  reason: reason,
                }),
              });

              // Reset form state
              setSubmitPressed(false);
              setFavCard("");
              setTrophyCount(0);
              setReason("");
              setFavCardErr("hidden");

              // Navigate to the page displaying all responses
              navigate("/browse-forms");
            } else {
              // Handle validation errors
              if (!cardExistsNow) {
                setFavCardErr("visible");
                setFavCardErrMessage("Card Doesn't Exist");
                console.log("Card Doesn't Exist!");
              }
              if (favCard === "") {
                setFavCardErr("visible");
                setFavCardErrMessage("Enter Your Favourite Card");
              }
              if (cardExistsNow && favCard !== "") {
                setFavCardErr("hidden");
              }
              if (trophyCount == 0) {
                console.log("No Trophies");
              }
              if (reason === "") {
                console.log("No reason provided");
              }
            }
          }}
          className="submit-button"
        >
          Submit!
        </button>
      </div>
    </div>
  );
}
