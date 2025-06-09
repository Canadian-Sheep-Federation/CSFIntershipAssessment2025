import { useState } from "react";
import { TeamReviewFormProps } from "../models";
import { createReview } from "../APIfunctions/CreateReview";

interface ReviewFormProps {
  id: string;
  teamName: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({ id, teamName, onReviewSubmitted }: ReviewFormProps) {
  const [review, setReview] = useState<TeamReviewFormProps>({
    teamId: id,
    username: "",
    team: teamName || "",
    rating: 0,
    favoritePlayer: "",
    comment: "",
    createdAt: new Date().toISOString(),
  });

// Function to validate the form inputs
  const isFormValid = () => {
  return (
    review.username!.trim() !== "" &&
    review.rating > 0 &&
    review.favoritePlayer.trim() !== "" &&
    review.comment.trim() !== ""
  );
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior
  setReview({ ...review, createdAt: new Date().toISOString() }); // Update createdAt to current time
  if (!isFormValid()) return; // Prevent submission if form is invalid
  await createReview(review); // Call the API function to create the review
  if (onReviewSubmitted) onReviewSubmitted(); // Call the callback after submit
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white text-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Team Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Username
          </label>
          <input
            type="text"
            value={review.username}
            placeholder="Enter your username"
            onChange={(e) =>
              setReview({ ...review, username: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <select
            value={review.rating}
            onChange={(e) =>
              setReview({ ...review, rating: parseInt(e.target.value, 10) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favorite Player
          </label>
          <input
            type="text"
            value={review.favoritePlayer}
            placeholder="Enter your favorite player"
            onChange={(e) =>
              setReview({ ...review, favoritePlayer: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            rows={4}
            value={review.comment}
            placeholder="Enter your comments about the team"
            onChange={(e) =>
              setReview({ ...review, comment: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isFormValid()}
            className={`w-full text-white py-2 rounded-md transition duration-200 ${
                    isFormValid()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}        
            >
          Submit Review
        </button>
      </form>
    </div>
  );
}
