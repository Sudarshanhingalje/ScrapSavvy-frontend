import "../../../features/customer/styles/ProductMarquee.css";
import ItemCard from "../products/ItemCard";

const ProductMarquee = ({ products = [], onViewProduct }) => {
  const safeProducts = (products || []).filter(Boolean);

  return (
    <div className="pm-section">
      {/* ── Section Header ── */}
      <div className="pm-section__header">
        <div className="pm-section__left">
          <h2 className="pm-section__title">Products available</h2>
          {safeProducts.length > 0 && (
            <span className="pm-section__badge">
              {safeProducts.length} items
            </span>
          )}
        </div>
        <span className="pm-section__subtitle">
          Browse scrap products from the yard
        </span>
      </div>

      {/* ── Scrolling Marquee ── */}
      {safeProducts.length === 0 ? (
        <p className="pm-empty">No products available right now.</p>
      ) : (
        <div className="pm-wrapper">
          <div className="pm-track">
            {safeProducts.concat(safeProducts).map((product, index) => (
              <div
                className="pm-item"
                key={(product?._id || product?.id) + "-" + index}
              >
                <ItemCard product={product} onViewProduct={onViewProduct} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMarquee;
