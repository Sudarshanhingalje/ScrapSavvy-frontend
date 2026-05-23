import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScrapyardSidebar from "../../../../../shared/layout/ScrapyardSidebar";

import { getOwnerReviews } from "../../../../customer/cart/api/reviewApi";

// STAR DISPLAY
const StarDisplay = ({ rating = 0 }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <span
      style={{
        color: "#f59e0b",
        fontSize: "15px",
        letterSpacing: "1px",
      }}
    >
      {"★".repeat(safeRating)}

      <span style={{ color: "#e2e8f0" }}>{"★".repeat(5 - safeRating)}</span>
    </span>
  );
};

// RATING BADGE
const RatingBadge = ({ rating }) => {
  const colors = {
    5: { bg: "#f0fdf4", color: "#16a34a" },
    4: { bg: "#f0fdf4", color: "#16a34a" },
    3: { bg: "#fefce8", color: "#ca8a04" },
    2: { bg: "#fff7ed", color: "#ea580c" },
    1: { bg: "#fef2f2", color: "#dc2626" },
  };

  const c = colors[rating] || colors[3];

  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        fontWeight: 800,
        fontSize: "13px",
        borderRadius: "6px",
        padding: "3px 10px",
      }}
    >
      {rating}/5
    </span>
  );
};

const ReviewsPage = () => {
  const { user } = useSelector((state) => state.auth);

  // FRONTEND FIX
  const ownerProfileId = user?.userId;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (!ownerProfileId) return;

    setLoading(true);

    getOwnerReviews(ownerProfileId)
      .then((res) => {
        setReviews(res.data || []);
      })
      .catch(() => {
        setError("Could not load reviews.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ownerProfileId]);

  // AVG
  const avgRating = reviews.length
    ? (
        reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) /
        reviews.length
      ).toFixed(1)
    : "—";

  // DISTRIBUTION
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Number(r.rating) === star).length,
  }));

  // FILTER
  const filtered =
    filter === "ALL"
      ? reviews
      : reviews.filter((r) => Number(r.rating) === Number(filter));

  // DATE FORMAT
  const formatDate = (dt) =>
    new Date(dt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <ScrapyardSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "260px",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "24px",
          }}
        >
          ⭐ Customer Reviews
        </h1>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              color: "#64748b",
              padding: "40px",
              textAlign: "center",
            }}
          >
            ⏳ Loading reviews...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div
            style={{
              color: "#dc2626",
              padding: "20px",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && (
          <>
            {/* SUMMARY */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  textAlign: "center",
                  borderRight: "1px solid #f1f5f9",
                  paddingRight: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "56px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1,
                  }}
                >
                  {avgRating}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                  }}
                >
                  <StarDisplay rating={Math.round(Number(avgRating))} />
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    marginTop: "6px",
                  }}
                >
                  {reviews.length} total reviews
                </div>
              </div>

              {/* RIGHT */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {distribution.map(({ star, count }) => {
                  const pct = reviews.length
                    ? Math.round((count / reviews.length) * 100)
                    : 0;

                  return (
                    <div
                      key={star}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          textAlign: "right",
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {star}
                      </span>

                      <span style={{ color: "#f59e0b" }}>★</span>

                      <div
                        style={{
                          flex: 1,
                          background: "#f1f5f9",
                          borderRadius: "99px",
                          height: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background:
                              star >= 4
                                ? "#22c55e"
                                : star === 3
                                  ? "#f59e0b"
                                  : "#ef4444",
                            borderRadius: "99px",
                            transition: "width 0.4s",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          width: "28px",
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FILTERS */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              {["ALL", "5", "4", "3", "2", "1"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1.5px solid",
                    borderColor: filter === f ? "#2563eb" : "#e2e8f0",
                    background: filter === f ? "#2563eb" : "#fff",
                    color: filter === f ? "#fff" : "#374151",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {f === "ALL" ? "All" : `${f} ★`}{" "}
                  <span
                    style={{
                      opacity: 0.7,
                      fontSize: "11px",
                    }}
                  >
                    (
                    {f === "ALL"
                      ? reviews.length
                      : reviews.filter((r) => Number(r.rating) === Number(f))
                          .length}
                    )
                  </span>
                </button>
              ))}
            </div>

            {/* EMPTY */}
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: "#94a3b8",
                  fontSize: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "12px",
                  }}
                >
                  📭
                </div>
                No reviews yet
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {filtered.map((review) => (
                  <div
                    key={review.reviewId || review.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "18px 20px",
                    }}
                  >
                    {/* TOP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "10px",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            color: "#0f172a",
                          }}
                        >
                          {review.productName}
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            marginTop: "2px",
                          }}
                        >
                          Order #{review.orderId} · {review.reviewerName}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <RatingBadge rating={review.rating} />

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                          }}
                        >
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* STARS */}
                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <StarDisplay rating={review.rating} />
                    </div>

                    {/* TEXT */}
                    {review.reviewText ? (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          margin: 0,
                          lineHeight: "1.6",
                          wordBreak: "break-word",
                        }}
                      >
                        "{review.reviewText}"
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#94a3b8",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        No written review.
                      </p>
                    )}

                    {/* VERIFIED */}
                    {review.verified && (
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            background: "#f0fdf4",
                            color: "#16a34a",
                            border: "1px solid #86efac",
                            borderRadius: "6px",
                            padding: "2px 8px",
                            fontWeight: 600,
                          }}
                        >
                          ✓ Verified Purchase
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
