import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "") return;

    const reviewData = {
      id: Date.now(),
      text: newReview,
      rating: rating,
    };

    setReviews([...reviews, reviewData]);
    setNewReview("");
    setRating(5);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-green-600">User Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <label className="block text-gray-700 font-semibold">Leave a Review:</label>
        <textarea
          className="w-full p-2 border rounded-lg focus:ring-green-400 focus:border-green-400 mt-2"
          rows="3"
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>

        <label className="block text-gray-700 font-semibold mt-4">Rating:</label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-green-400 focus:border-green-400 mt-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} Stars
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">User Feedback</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-yellow-500 font-semibold">Rating: {review.rating} ★</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

