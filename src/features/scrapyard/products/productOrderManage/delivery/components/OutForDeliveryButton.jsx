const OutForDeliveryButton = ({ currentStatus, onClick, loading }) => {
  if (currentStatus === "OUT_FOR_DELIVERY" || currentStatus === "DELIVERED") {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "12px 20px",
        background: "#f59e0b",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "600",
        fontSize: "14px",
        opacity: loading ? 0.7 : 1,
      }}
    >
      🚚 Mark Out For Delivery
    </button>
  );
};

export default OutForDeliveryButton;
