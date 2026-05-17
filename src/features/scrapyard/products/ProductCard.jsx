import { calculateDiscount } from "../../scrapyard/products/product-form/utils/calculateDiscount";
import {
  calcQuality,
  qualityLabel,
} from "../../scrapyard/products/product-form/utils/calculateQuality";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const image =
    product.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image";

  const discount = calculateDiscount(product.mrp, product.price);
  const score = calcQuality(product);
  const ql = qualityLabel(score);
  const filledBars = Math.round(score / 10);

  const activeSpecs = Array.isArray(product.specifications)
    ? product.specifications.filter((spec) => spec?.key && spec?.value)
    : [];

  return (
    <div className="pf-card" style={{ marginBottom: 0 }}>
      {/* ── Image + condition badge ── */}
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
            letterSpacing: "0.04em",
          }}
        >
          {product.condition || "New"}
        </span>
        {discount && (
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#16a34a",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            {discount}
          </span>
        )}
        {product.images?.length > 1 && (
          <span
            style={{
              position: "absolute",
              bottom: 8,
              right: 10,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 12,
            }}
          >
            +{product.images.length - 1} more
          </span>
        )}
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* ── Brand / Model ── */}
        {(product.brand || product.model) && (
          <div
            style={{
              fontSize: 11,
              color: "#6b7280",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {product.brand}
            {product.brand && product.model && " · "}
            {product.model}
          </div>
        )}

        {/* ── Title ── */}
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111",
            marginBottom: 6,
            lineHeight: 1.4,
          }}
        >
          {product.productName}
        </h2>

        {/* ── Description ── */}
        {product.description && (
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 12,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        )}

        {/* ── Pricing row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: "#15803d" }}>
            ₹{product.price}
          </span>
          {product.mrp &&
            parseFloat(product.mrp) > parseFloat(product.price) && (
              <span
                style={{
                  fontSize: 13,
                  color: "#9ca3af",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.mrp}
              </span>
            )}
          {product.gst && (
            <span
              style={{
                fontSize: 11,
                background: "#fef3c7",
                color: "#92400e",
                padding: "2px 8px",
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              GST {product.gst}%
            </span>
          )}
        </div>

        {/* ── Stock / Order qty ── */}
        <div className="pf-grid-3" style={{ marginBottom: 12 }}>
          <div style={statBox}>
            <span style={statLabel}>Stock</span>
            <span style={statValue}>{product.quantity ?? "—"}</span>
          </div>
          <div style={statBox}>
            <span style={statLabel}>Min order</span>
            <span style={statValue}>{product.minOrderQty || 1}</span>
          </div>
          <div style={statBox}>
            <span style={statLabel}>Max order</span>
            <span style={statValue}>{product.maxOrderQty || "—"}</span>
          </div>
        </div>

        {/* ── Warranty / Fulfilled by ── */}
        {(product.warranty || product.fulfilledBy) && (
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {product.warranty && (
              <span style={chipStyle}>
                🛡{" "}
                {product.warranty === "6m"
                  ? "6 months warranty"
                  : product.warranty === "1y"
                    ? "1 year warranty"
                    : product.warranty === "2y"
                      ? "2 years warranty"
                      : product.warranty === "3y"
                        ? "3 years warranty"
                        : product.warranty}
              </span>
            )}
            {product.fulfilledBy && (
              <span style={chipStyle}>
                🚚{" "}
                {product.fulfilledBy === "seller"
                  ? "Self-ship"
                  : "Platform managed"}
              </span>
            )}
            {product.countryOfOrigin && (
              <span style={chipStyle}>🌍 {product.countryOfOrigin}</span>
            )}
          </div>
        )}

        {/* ── Dimensions / Weight ── */}
        {(product.weight ||
          product.length ||
          product.width ||
          product.height) && (
          <div className="pf-info-box" style={{ marginBottom: 12 }}>
            <span>📦</span>
            <span style={{ fontSize: 12 }}>
              {product.weight && `${product.weight} kg`}
              {product.length &&
                ` · ${product.length} × ${product.width} × ${product.height} cm`}
            </span>
          </div>
        )}

        {/* ── Specifications ── */}
        {activeSpecs?.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: 6,
              }}
            >
              Specifications
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {activeSpecs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    borderBottom: "1px solid #f3f4f6",
                    paddingBottom: 4,
                  }}
                >
                  <span style={{ color: "#6b7280" }}>{spec.key}</span>
                  <span style={{ fontWeight: 600, color: "#111" }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tags ── */}
        {product.tags?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {product.tags.map((t, i) => (
              <span
                key={i}
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "2px 10px",
                  borderRadius: 20,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ── Quality Score bar ── */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Listing quality
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: ql.color }}>
              {score}/100 — {ql.text}
            </span>
          </div>
          <div className="pf-quality-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 5,
                  flex: 1,
                  borderRadius: 3,
                  background:
                    i < filledBars
                      ? score >= 70
                        ? "#16a34a"
                        : "#2563eb"
                      : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onEdit(product)}
            className="pf-btn-primary"
            style={{ flex: 1, justifyContent: "center" }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            style={{
              flex: 1,
              height: 40,
              border: "1px solid #fecaca",
              borderRadius: 8,
              background: "#fff5f5",
              color: "#dc2626",
              fontWeight: 600,
              fontSize: 13,
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

const statBox = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "8px 10px",
  textAlign: "center",
};

const statLabel = {
  display: "block",
  fontSize: 10,
  color: "#9ca3af",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: 2,
};

const statValue = {
  display: "block",
  fontSize: 14,
  fontWeight: 700,
  color: "#111",
};

const chipStyle = {
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 500,
  color: "#374151",
  padding: "3px 10px",
};

export default ProductCard;
