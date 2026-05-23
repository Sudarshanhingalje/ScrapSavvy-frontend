// src/features/home/pages/ReviewMarquee.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerReviews } from "../../home/redux/reviewsThunk";
import "../styles/ReviewMarquee.css";

/* ── star renderer ── */
function Stars({ rating }) {
  return (
    <span className="rmq-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "rmq-star filled" : "rmq-star"}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ── single card ── */
function ReviewCard({ review }) {
  const initials = review.reviewerName
    ? review.reviewerName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="rmq-card">
      <div className="rmq-card__top">
        <div className="rmq-avatar">{initials}</div>
        <div className="rmq-meta">
          <span className="rmq-name">{review.reviewerName}</span>
          {review.verified && (
            <span className="rmq-verified">✔ Verified Pickup</span>
          )}
        </div>
      </div>

      <Stars rating={review.rating} />

      <p className="rmq-text">
        {review.reviewText?.length > 120
          ? review.reviewText.slice(0, 117) + "…"
          : review.reviewText}
      </p>

      {review.productName && (
        <div className="rmq-product">
          <span className="rmq-product__dot" />
          {review.productName}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════ */
export default function ReviewMarquee() {
  const dispatch = useDispatch();
  const { data: reviews, status } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getOwnerReviews(2)); // ownerProfileId = 2, same as scrapRates
  }, [dispatch]);

  // ── loading ──
  if (status === "loading" || status === "idle") {
    return (
      <section className="rmq-section">
        <div className="rmq-header">
          <span className="rmq-eyebrow">Customer Reviews</span>
          <h2 className="rmq-title">What Pune says about us</h2>
        </div>
        <div className="rmq-loading">
          <span className="rmq-loading__dot" />
          <span className="rmq-loading__dot" />
          <span className="rmq-loading__dot" />
        </div>
      </section>
    );
  }

  // ── error or empty ──
  if (status === "failed" || !reviews || reviews.length === 0) {
    return null; // silently hide section — no fake data
  }

  // ── real data: duplicate track for seamless infinite loop ──
  // need at least enough cards to fill viewport; duplicate until we have 10+
  const minCards = 10;
  let track = [...reviews];
  while (track.length < minCards) {
    track = [...track, ...reviews];
  }
  const doubled = [...track, ...track]; // duplicate for seamless loop

  // compute average from real data
  const avg = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="rmq-section">
      <div className="rmq-header">
        <span className="rmq-eyebrow">Customer Reviews</span>
        <h2 className="rmq-title">What Pune says about us</h2>
      </div>

      <div
        className="rmq-track-wrapper"
        aria-label="Scrolling customer reviews"
      >
        <div className="rmq-track">
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>

      {/* aggregate rating strip — computed from real DB data */}
      <div className="rmq-aggregate">
        <span className="rmq-agg-stars">
          {Array.from({ length: Math.round(parseFloat(avg)) }, (_, i) => (
            <span key={i}>★</span>
          ))}
        </span>
        <span className="rmq-agg-text">
          Rated <strong>{avg} / 5</strong> by {reviews.length} verified customer
          {reviews.length !== 1 ? "s" : ""} in Pune
        </span>
      </div>
    </section>
  );
}
