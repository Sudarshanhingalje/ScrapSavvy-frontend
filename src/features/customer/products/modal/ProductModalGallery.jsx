import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { API_BASE_URL } from "../../../../config/env";

const ProductModalGallery = ({
  product,
  images,
  activeImg,
  setActiveImg,
  discountPercent,
}) => {
  return (
    <div className="pdm-left">
      {/* discount badge */}
      {discountPercent > 0 && (
        <span className="pdm-badge-discount">−{discountPercent}%</span>
      )}

      {/* main image swiper */}
      <div className="pdm-swiper-wrap">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="pdm-main-swiper"
          onSlideChange={(s) => setActiveImg(s.activeIndex)}
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${API_BASE_URL}${img}`}
                  alt={`product-${i}`}
                  className="pdm-main-image"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/500x400?text=No+Image";
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src="https://placehold.co/500x400?text=No+Image"
                alt="No image"
                className="pdm-main-image"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* thumbnail strip */}
      {images.length > 1 && (
        <div className="pdm-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}${img}`}
              alt={`thumb-${i}`}
              className={`pdm-thumb ${activeImg === i ? "active" : ""}`}
              onError={(e) => {
                e.target.src = "https://placehold.co/80x80?text=N/A";
              }}
            />
          ))}
        </div>
      )}

      {/* spec table — shown in left panel */}
      <div className="pdm-left-table">
        {product?.condition && (
          <div className="pdm-left-row">
            <span>Condition</span>
            <strong>{product.condition}</strong>
          </div>
        )}
        {product?.weight != null && (
          <div className="pdm-left-row">
            <span>Weight</span>
            <strong>{product.weight} kg</strong>
          </div>
        )}
        {product?.countryOfOrigin && (
          <div className="pdm-left-row">
            <span>Country</span>
            <strong>{product.countryOfOrigin}</strong>
          </div>
        )}
        {product?.model && (
          <div className="pdm-left-row">
            <span>Model</span>
            <strong>{product.model}</strong>
          </div>
        )}
        {product?.gst != null && (
          <div className="pdm-left-row">
            <span>GST</span>
            <strong>{product.gst}%</strong>
          </div>
        )}
        <div className="pdm-left-row">
          <span>Warranty</span>
          <strong>{product?.warranty || "No Warranty"}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProductModalGallery;
