import { TeamReviewFormProps } from "../models";


//Submit a review for a team
export const createReview = async (reviewData: TeamReviewFormProps) => {
    if (!reviewData || !reviewData.teamId) {
        console.error("Review data or team ID is not defined");
        return;
    }

    console.log("Creating review with data:", reviewData);
  const res = await fetch(`http://localhost:3000/api/createReview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);
  return data;
}