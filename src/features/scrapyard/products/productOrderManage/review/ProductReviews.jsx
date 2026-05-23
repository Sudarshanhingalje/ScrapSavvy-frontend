import { useEffect, useState } from "react";
import { getProductReviews } from "./reviewApi";

// SAFE STAR DISPLAY
const StarDisplay = ({ rating = 0, size = "16px" }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <span style={{ fontSize: size, letterSpacing: "1px" }}>
      <span style={{ color: "#f59e0b" }}>{"★".repeat(safeRating)}</span>

      <span style={{ color: "#d1d5db" }}>{"★".repeat(5 - safeRating)}</span>
    </span>
  );
};

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);

    getProductReviews(productId)
      .then((res) => setReviews(res.data || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  const avg = reviews.length
    ? (
        reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) /
        reviews.length
      ).toFixed(1)
    : null;

  const formatDate = (dt) =>
    new Date(dt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div
        style={{
          padding: "16px",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        Loading reviews...
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
          }}
        >
          Customer Reviews
        </h3>

        {avg && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              {avg}
            </span>

            <StarDisplay rating={Math.round(Number(avg))} />

            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              ({reviews.length})
            </span>
          </div>
        )}
      </div>

      {/* EMPTY */}
      {reviews.length === 0 ? (
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
            background: "#f8fafc",
            borderRadius: "10px",
          }}
        >
          No reviews yet. Be the first to review!
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.reviewId || r.id}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              {/* TOP */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#1e293b",
                    }}
                  >
                    {r.reviewerName || "Anonymous"}
                  </span>

                  {r.verified && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "11px",
                        background: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #86efac",
                        borderRadius: "4px",
                        padding: "1px 6px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                  }}
                >
                  {formatDate(r.createdAt)}
                </span>
              </div>

              {/* STARS */}
              <StarDisplay rating={r.rating} />

              {/* REVIEW TEXT */}
              {r.reviewText && (
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13px",
                    color: "#374151",
                    lineHeight: "1.55",
                    wordBreak: "break-word",
                  }}
                >
                  {r.reviewText}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
