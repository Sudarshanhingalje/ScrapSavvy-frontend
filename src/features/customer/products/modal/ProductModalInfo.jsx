const ProductModalInfo = ({
  product,
  specifications,
  inStock,
  discountPercent,
}) => {
  return (
    <div className="pdm-right-scroll">
      <p className="pdm-category">{product?.categoryName}</p>
      <h1 className="pdm-title">{product?.productName}</h1>

      <div className="pdm-meta-row">
        <span className="pdm-brand">
          Brand: <strong>{product?.brand || "N/A"}</strong>
        </span>
        <span className={`pdm-stock-badge ${inStock ? "in" : "out"}`}>
          {inStock ? `${product.quantity} in stock` : "Out of stock"}
        </span>
      </div>

      <div className="pdm-price-row">
        <span className="pdm-price">
          ₹{Number(product?.price).toLocaleString("en-IN")}
        </span>
        {product?.mrp && (
          <span className="pdm-mrp">
            ₹{Number(product.mrp).toLocaleString("en-IN")}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="pdm-off-badge">{discountPercent}% off</span>
        )}
      </div>

      {product?.description && (
        <div className="pdm-section">
          <h3 className="pdm-section-title">Description</h3>
          <p className="pdm-description">{product.description}</p>
        </div>
      )}

      {specifications.length > 0 && (
        <div className="pdm-section">
          <h3 className="pdm-section-title">Specifications</h3>
          <div className="pdm-spec-grid">
            {specifications.map((spec, i) => (
              <div className="pdm-spec-row" key={i}>
                <span>{spec?.key}</span>
                <strong>{spec?.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModalInfo;
