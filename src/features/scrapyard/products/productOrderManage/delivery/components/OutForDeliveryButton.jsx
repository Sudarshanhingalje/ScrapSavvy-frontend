// ==============================
// FILE: OutForDeliveryButton.jsx
// ==============================

const OutForDeliveryButton = ({ currentStatus, onClick }) => {
  if (currentStatus === "OUT_FOR_DELIVERY") {
    return null;
  }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        background: "#f59e0b",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Mark Out For Delivery
    </button>
  );
};

export default OutForDeliveryButton;
