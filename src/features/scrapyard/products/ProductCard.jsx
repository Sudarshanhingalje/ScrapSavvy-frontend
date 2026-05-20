import { API_BASE_URL } from "../../../config/env";
import { calculateDiscount } from "../../scrapyard/products/product-form/utils/calculateDiscount";
import {
  calcQuality,
  qualityLabel,
} from "../../scrapyard/products/product-form/utils/calculateQuality";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const image =
    product.images?.length > 0
      ? `${API_BASE_URL}${
          typeof product.images[0] === "string"
            ? product.images[0]
            : product.images[0].imageUrl
        }`
      : "https://placehold.co/600x400?text=No+Image";

  const discount = calculateDiscount(product.mrp, product.price);
  const score = calcQuality(product);
  const ql = qualityLabel(score);
  const filledBars = Math.round(score / 10);

  const activeSpecs = (() => {
    try {
      const parsed =
        typeof product.specifications === "string"
          ? JSON.parse(product.specifications)
          : product.specifications;

      return Array.isArray(parsed)
        ? parsed.filter((s) => s?.key && s?.value)
        : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="pf-card" style={{ marginBottom: 0 }}>
      {/* IMAGE */}
      <div style={{ position: "relative" }}>
        <img
          src={image}
          alt={product.productName}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            display: "block",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(29,78,216,0.9)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          {product.condition || "New"}
        </span>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700 }}>{product.productName}</h2>

        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <button
            onClick={() => onEdit?.(product)}
            className="pf-btn-primary"
            style={{ flex: 1 }}
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete?.(product)}
            style={{
              flex: 1,
              height: 40,
              border: "1px solid #fecaca",
              borderRadius: 8,
              background: "#fff5f5",
              color: "#dc2626",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
