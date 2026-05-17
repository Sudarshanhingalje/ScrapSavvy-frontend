import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_BASE_URL } from "../../../config/env";
import "../../../features/customer/styles/ItemCard.css";

const ItemCard = ({ product = {} }) => {
  const images = Array.isArray(product?.images) ? product.images : [];

  return (
    <div className="fk-card">
      {/* BADGE */}
      {product?.condition && (
        <span className="fk-card__badge">{product.condition}</span>
      )}

      {/* IMAGE SWIPER */}
      <div className="fk-card__image-wrap">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="fk-swiper"
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="fk-card__slide">
                  <img
                    src={`${API_BASE_URL}${img}`}
                    alt={`${product?.productName} - ${i + 1}`}
                    className="fk-card__img"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/400x300/f5f5f5/999?text=No+Image";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="fk-card__slide">
                <img
                  src="https://placehold.co/400x300/f5f5f5/999?text=No+Image"
                  alt="no-img"
                  className="fk-card__img"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* CONTENT */}
      <div className="fk-card__body">
        <p className="fk-card__seller">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Scrapyard
        </p>

        <h4 className="fk-card__name">
          {product?.productName || "Product Name"}
        </h4>

        <div className="fk-card__price-row">
          <span className="fk-card__price">
            ₹{product?.price?.toLocaleString("en-IN") ?? "—"}
          </span>
        </div>

        <div className="fk-card__meta-row">
          <span className="fk-card__stock">
            <span
              className={`fk-stock-dot ${(product?.quantity ?? 0) > 0 ? "fk-stock-dot--in" : "fk-stock-dot--out"}`}
            />
            {(product?.quantity ?? 0) > 0
              ? `${product.quantity} in stock`
              : "Out of stock"}
          </span>
        </div>

        <button
          className="fk-card__btn"
          onClick={() => alert(`Buying ${product?.productName}`)}
          disabled={!product?.quantity}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
