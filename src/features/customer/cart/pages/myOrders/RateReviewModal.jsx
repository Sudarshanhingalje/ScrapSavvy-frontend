// src/features/customer/cart/pages/myOrders/RateReviewModal.jsx
// NEW FILE — create this file

import { useState } from "react";
import api from "../../../../../shared/services/api";

const RateReviewModal = ({ order, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // POST to your backend — adjust endpoint as needed
      await api.post("/reviews", {
        orderId: order.orderId,
        rating,
        reviewText: review,
        productIds: order.items.map((i) => i.productId),
      });
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.response?.data || "Failed to submit review. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Rate &amp; Review</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="modal-subtitle">
          Order #{order.orderId} ·{" "}
          {order.items.map((i) => i.productName).join(", ")}
        </p>

        {/* STARS */}
        <div className="star-row">
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              className={`star ${val <= (hovered || rating) ? "star-lit" : ""}`}
              onClick={() => setRating(val)}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(0)}
              role="button"
              aria-label={`${val} star`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="star-hint">
          {rating === 1 && "Poor"}
          {rating === 2 && "Fair"}
          {rating === 3 && "Good"}
          {rating === 4 && "Very Good"}
          {rating === 5 && "Excellent!"}
          {rating === 0 && "Tap a star to rate"}
        </p>

        {/* TEXT */}
        <textarea
          className="review-textarea"
          placeholder="Share your experience with this product (optional)..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
        />

        {error && <p className="modal-error">{error}</p>}
        {success && (
          <p className="modal-success">✅ Review submitted! Thank you.</p>
        )}

        <div className="modal-footer">
          <button
            className="btn btn-clear"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || success}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateReviewModal;
