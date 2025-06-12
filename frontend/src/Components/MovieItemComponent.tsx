import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieItemComponent = ({ movie, actorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [showReview, setShowReview] = React.useState(false);

  const onSubmit = async () => {
    const req = await fetch(
      `${import.meta.env.VITE_API_URL}/actor/review/${actorId}/${movie.imDBId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          rating,
          review,
        }),
      }
    );

    const res = await req.json();
    if (res.message === "Review added") {
      window.location.reload();
    }
  };

  return (
    <div className="actor__film">
      <div>
        <img src={movie.image} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.role}</p>
      </div>
      <div
        onClick={() => setShowReview(!showReview)}
        className="actor__film-review-button"
      >
        Reviews
      </div>
      <>
        {showReview && (
          <div>
            <form
              className="actor__review-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <input
                required
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder="Rating"
                type="number"
                required
                value={rating}
                onChange={(e) => {
                  if (+e.target.value >= 0 && +e.target.value <= 10) {
                    setRating(+e.target.value);
                  }
                }}
              />
              <textarea
                placeholder="Review"
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
              />
              <button>Submit Review</button>
            </form>
            <div>
              <h3>Reviews</h3>
              <div>
                {movie.ratings.map((review) => (
                  <div key={review._id} className="actor__film-review">
                    <div className="actor__film-review-metadata">
                      <div>{review.username}</div>
                      <p>{review.rating}/10</p>
                    </div>
                    <p className="actor__film-review-text">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MovieItemComponent;
