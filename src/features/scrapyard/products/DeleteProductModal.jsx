const DeleteProductModal = ({ open, onClose, onConfirm, product }) => {
  if (!open) return null;

  const getImage = () => {
    if (!product?.images?.length) return null;

    const img = product.images[0];

    if (typeof img === "string") return img;
    if (typeof img === "object") return img.imageUrl || img.url;

    return null;
  };

  const imageUrl = getImage();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div className="pf-card" style={{ width: 420, margin: 0 }}>
        {/* Header */}
        <div className="pf-card-header">
          <span style={{ fontSize: 18 }}>🗑</span>
          <span className="pf-card-header__title">Delete product</span>
          <span className="pf-card-header__badge--required">Irreversible</span>
        </div>

        <div className="pf-card-body">
          {/* Product preview */}
          {product && (
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 16,
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.productName}
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
              )}

              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: 2,
                  }}
                >
                  {product.productName}
                </p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>
                  ₹{product.price}
                  {product.brand && ` · ${product.brand}`}
                  {product.quantity && ` · Stock: ${product.quantity}`}
                </p>
              </div>
            </div>
          )}

          {/* Warning */}
          <div
            className="pf-info-box"
            style={{
              background: "#fff5f5",
              border: "1px solid #fecaca",
              color: "#dc2626",
            }}
          >
            <span>⚠️</span>
            <span>
              This will permanently delete the product. This action cannot be
              undone.
            </span>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button onClick={onClose} className="pf-btn-secondary">
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="pf-btn-primary"
              style={{ background: "#dc2626" }}
            >
              🗑 Delete product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
