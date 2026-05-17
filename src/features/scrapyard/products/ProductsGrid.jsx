import ProductCard from "./ProductCard";

const ProductsGrid = ({ products, onEdit, onDelete }) => {
  if (!products?.length) {
    return (
      <div className="pf-card">
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            No products yet
          </p>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>
            Add your first product using the form above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Summary bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          padding: "10px 16px",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          fontSize: 13,
        }}
      >
        <span style={{ color: "#6b7280" }}>
          Showing <strong style={{ color: "#111" }}>{products.length}</strong>{" "}
          product{products.length !== 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>
          Total stock:{" "}
          {products.reduce((sum, p) => sum + (parseInt(p.quantity) || 0), 0)}{" "}
          units
        </span>
      </div>

      {/* ── Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsGrid;
