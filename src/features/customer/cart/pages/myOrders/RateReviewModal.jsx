import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkReviewed, submitReview } from "../../../cart/api/reviewApi";

const STAR_LABELS = {
  0: "Tap a star to rate",
  1: "Poor 😞",
  2: "Fair 😐",
  3: "Good 🙂",
  4: "Very Good 😊",
  5: "Excellent! 🌟",
};

const Star = ({ value, filled, onHover, onLeave, onClick }) => (
  <span
    role="button"
    aria-label={`${value} star`}
    onClick={() => onClick(value)}
    onMouseEnter={() => onHover(value)}
    onMouseLeave={onLeave}
    style={{
      fontSize: "36px",
      cursor: "pointer",
      color: filled ? "#f59e0b" : "#d1d5db",
      transition: "color 0.12s, transform 0.1s",
      transform: filled ? "scale(1.15)" : "scale(1)",
      display: "inline-block",
      userSelect: "none",
    }}
  >
    ★
  </span>
);

const RateReviewModal = ({ order, onClose }) => {
  const { user } = useSelector((state) => state.auth);

  // FRONTEND ONLY FIX
  // Backend expects userId in userProfileId param
  const userProfileId = user?.userId;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // CHECK ALREADY REVIEWED
  useEffect(() => {
    const check = async () => {
      if (!order?.items?.length) {
        setCheckingStatus(false);
        return;
      }

      try {
        const firstProductId = order.items[0].productId;

        const res = await checkReviewed(order.orderId, firstProductId);

        setAlreadyReviewed(res.data.reviewed);
      } catch (err) {
        console.log("Review check failed", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    check();
  }, [order]);

  // SUBMIT REVIEW
  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }

    if (!userProfileId) {
      setError("Please login again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitReview(userProfileId, {
        orderId: order.orderId,
        rating,
        reviewText: reviewText.trim(),
        productIds: order.items.map((i) => i.productId),
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to submit review.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ESC CLOSE
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "480px",
          padding: "28px",
        }}
      >
        {/* HEADER */}
        <div className="modal-header">
          <h3 className="modal-title">⭐ Rate & Review</h3>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ORDER INFO */}
        <p className="modal-subtitle" style={{ marginBottom: "20px" }}>
          Order <strong>#{order.orderId}</strong>
          {" · "}
          {order.items
            .slice(0, 2)
            .map((i) => i.productName)
            .join(", ")}
          {order.items.length > 2 && ` +${order.items.length - 2} more`}
        </p>

        {/* LOADING */}
        {checkingStatus ? (
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              color: "#64748b",
            }}
          >
            Checking review status...
          </div>
        ) : alreadyReviewed ? (
          /* ALREADY REVIEWED */
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "10px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "8px",
              }}
            >
              ✅
            </div>

            <div
              style={{
                fontWeight: 700,
                color: "#16a34a",
                fontSize: "16px",
              }}
            >
              Already reviewed this order!
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "6px",
              }}
            >
              Thank you for your feedback.
            </p>

            <button
              className="btn btn-primary"
              style={{ marginTop: "16px" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : success ? (
          /* SUCCESS */
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "10px",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "8px",
              }}
            >
              🎉
            </div>

            <div
              style={{
                fontWeight: 700,
                color: "#16a34a",
                fontSize: "17px",
              }}
            >
              Review submitted successfully!
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "6px",
              }}
            >
              Your feedback helps other buyers.
            </p>
          </div>
        ) : (
          <>
            {/* PRODUCTS */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                Products in this order
              </div>

              {order.items.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {item.productImage && (
                    <img
                      src={`http://localhost:8080${item.productImage}`}
                      alt={item.productName}
                      style={{
                        width: "42px",
                        height: "42px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  )}

                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {item.productName}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                      }}
                    >
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* STARS */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <Star
                    key={val}
                    value={val}
                    filled={val <= (hovered || rating)}
                    onHover={setHovered}
                    onLeave={() => setHovered(0)}
                    onClick={setRating}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: rating ? "#f59e0b" : "#94a3b8",
                  fontWeight: 600,
                  height: "18px",
                }}
              >
                {STAR_LABELS[hovered || rating]}
              </div>
            </div>

            {/* REVIEW INPUT */}
            <textarea
              placeholder="Tell others about your experience (optional)..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              maxLength={1000}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "12px",
                border: "1.5px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                resize: "vertical",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {reviewText.length}/1000
            </div>

            {/* ERROR */}
            {error && (
              <p className="modal-error" style={{ marginTop: "10px" }}>
                ⚠️ {error}
              </p>
            )}

            {/* FOOTER */}
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
                disabled={loading || rating === 0}
                style={{ minWidth: "140px" }}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RateReviewModal;
