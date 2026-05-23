import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { API_BASE_URL } from "../../../config/env";
import "../styles/ItemCard.css";

const conditionLabel = (condition = "") => {
  const c = condition.toLowerCase();
  if (c.includes("new")) return { cls: "fk-badge--new", text: "New" };
  if (c.includes("fair")) return { cls: "fk-badge--fair", text: "Fair" };
  return { cls: "fk-badge--good", text: "Good" };
};

const discount = (price, mrp) => {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
};

const ItemCard = ({ product = {}, onViewProduct }) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const inStock = (product?.quantity ?? 0) > 0;
  const off = discount(product?.price, product?.mrp);
  const badge = conditionLabel(product?.condition);

  return (
    <div
      className="fk-card"
      onClick={() => inStock && onViewProduct?.(product)}
    >
      {/* ── Swiper image ── */}
      <div className="fk-card__gallery">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          className="fk-swiper"
          onClick={(e) => e.stopPropagation()}
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="fk-card__slide">
                  <img
                    src={`${API_BASE_URL}${img}`}
                    alt={`${product?.productName}-${i}`}
                    className="fk-card__img"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/400x320/f0f0f0/aaaaaa?text=No+Image";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="fk-card__slide">
                <img
                  src="https://placehold.co/400x320/f0f0f0/aaaaaa?text=No+Image"
                  alt="No image"
                  className="fk-card__img"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Discount ribbon */}
        {off && (
          <div className="fk-ribbon">
            {off}%<br />
            <span>off</span>
          </div>
        )}

        {/* Condition badge */}
        {product?.condition && (
          <span className={`fk-badge ${badge.cls}`}>{badge.text}</span>
        )}

        {/* Wishlist */}
        <button
          className="fk-wish"
          aria-label="Save to wishlist"
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      <div className="fk-card__body">
        {/* Sponsored / Category */}
        <p className="fk-card__category">
          {product?.categoryName || "Category"}
        </p>

        {/* Product name */}
        <h4 className="fk-card__name">
          {product?.productName || "Product Name"}
        </h4>

        {/* Rating row */}
        <div className="fk-rating">
          <span className="fk-rating__pill">
            <svg viewBox="0 0 12 12" fill="currentColor" width="9" height="9">
              <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
            </svg>
            {product?.rating ?? "4.2"}
          </span>
          <span className="fk-rating__count">
            {product?.ratingCount
              ? `(${Number(product.ratingCount).toLocaleString("en-IN")})`
              : "(1,240)"}
          </span>
        </div>

        {/* Price block */}
        <div className="fk-price-block">
          <span className="fk-price">
            <span className="fk-price__sym">₹</span>
            {Number(product?.price || 0).toLocaleString("en-IN")}
          </span>

          {product?.mrp && (
            <span className="fk-price__mrp">
              M.R.P: <s>₹{Number(product.mrp).toLocaleString("en-IN")}</s>
            </span>
          )}

          {off && <span className="fk-price__off">Save {off}%</span>}
        </div>

        {/* Delivery */}
        <p className="fk-delivery">
          {inStock ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="12"
                height="12"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
              FREE Delivery by <strong>Tomorrow</strong>
            </>
          ) : (
            <span className="fk-delivery--out">Currently unavailable</span>
          )}
        </p>

        {/* Stock indicator */}
        {inStock && product.quantity <= 5 && (
          <p className="fk-urgency">Only {product.quantity} left in stock!</p>
        )}

        {/* CTA */}
        <div className="fk-actions">
          <button
            className={`fk-btn fk-btn--cart ${!inStock ? "fk-btn--disabled" : ""}`}
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              inStock && onViewProduct?.(product);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              width="15"
              height="15"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {inStock && (
            <button
              className="fk-btn fk-btn--buy"
              onClick={(e) => {
                e.stopPropagation();
                onViewProduct?.(product);
              }}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
