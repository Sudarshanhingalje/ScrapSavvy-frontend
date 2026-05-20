// src/features/customer/cart/components/myOrders/EmptyOrders.jsx

const EmptyOrders = () => (
  <div
    style={{
      background: "#fff",
      border: "0.5px solid #e0e0e0",
      borderRadius: 4,
      padding: "48px 24px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
    <p
      style={{
        fontSize: 16,
        fontWeight: 600,
        color: "#212121",
        marginBottom: 8,
      }}
    >
      No orders yet
    </p>
    <p style={{ fontSize: 13, color: "#878787" }}>
      Looks like you haven't placed any orders yet.
    </p>
  </div>
);

export default EmptyOrders;
