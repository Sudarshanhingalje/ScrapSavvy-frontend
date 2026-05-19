import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { API_BASE_URL } from "../../../config/env";

import "../../../features/customer/styles/ItemCard.css";

const conditionClass = (condition = "") => {
  const c = condition.toLowerCase();

  if (c.includes("new")) return "fk-card__badge--new";

  if (c.includes("fair")) return "fk-card__badge--fair";

  return "fk-card__badge--good";
};

const ItemCard = ({ product = {}, onViewProduct }) => {
  const images = Array.isArray(product?.images) ? product.images : [];

  const inStock = (product?.quantity ?? 0) > 0;

  return (
    <div className="fk-card">
      {/* BADGE */}
      {product?.condition && (
        <span className={`fk-card__badge ${conditionClass(product.condition)}`}>
          {product.condition}
        </span>
      )}

      {/* WISHLIST */}
      <button className="fk-card__wish" aria-label="Wishlist">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* IMAGES */}
      <div className="fk-card__image-wrap">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          className="fk-swiper"
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
                        "https://placehold.co/400x300/f5f5f5/aaa?text=No+Image";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="fk-card__slide">
                <img
                  src="https://placehold.co/400x300/f5f5f5/aaa?text=No+Image"
                  alt="No image"
                  className="fk-card__img"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* BODY */}
      <div className="fk-card__body">
        <p className="fk-card__category">
          {product?.categoryName || "Category"}
        </p>

        <h4 className="fk-card__name">{product?.productName || "Product"}</h4>

        <div className="fk-card__price-row">
          <span className="fk-card__price">
            ₹{Number(product?.price || 0).toLocaleString("en-IN")}
          </span>

          {product?.mrp && (
            <span className="fk-card__mrp">
              ₹{Number(product.mrp).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div
          className={`fk-card__stock ${
            inStock ? "fk-card__stock--in" : "fk-card__stock--out"
          }`}
        >
          <span
            className={`fk-stock-dot ${
              inStock ? "fk-stock-dot--in" : "fk-stock-dot--out"
            }`}
          />

          {inStock ? `${product.quantity} in stock` : "Out of stock"}
        </div>

        <hr className="fk-card__divider" />

        <button
          className={`fk-card__btn ${
            inStock ? "fk-card__btn--active" : "fk-card__btn--disabled"
          }`}
          onClick={() => onViewProduct(product)}
          disabled={!inStock}
        >
          {inStock ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              View Details
            </>
          ) : (
            "Out of stock"
          )}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
