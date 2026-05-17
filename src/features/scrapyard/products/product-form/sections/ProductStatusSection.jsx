import { STEPS } from "../constants/productStatus";

const ProductStatusSection = ({ editingProduct }) => (
  <>
    <div className="pf-page-header">
      <span style={{ fontSize: 24 }}>📦</span>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111",
            marginBottom: 2,
          }}
        >
          {editingProduct ? "Edit product" : "Add new product"}
        </p>
        <p style={{ fontSize: 12, color: "#9ca3af" }}>
          Fill in all details for better visibility and sales
        </p>
      </div>
      <span className={`pf-badge--${editingProduct ? "yellow" : "blue"}`}>
        {editingProduct ? "Editing" : "New listing"}
      </span>
    </div>

    <div className="pf-step-bar">
      {STEPS.map((s, i) => (
        <div key={i} className={`pf-step${i < 3 ? " pf-step--active" : ""}`}>
          <div style={{ marginBottom: 2 }}>{s.icon}</div>
          {s.label}
        </div>
      ))}
    </div>
  </>
);

export default ProductStatusSection;
