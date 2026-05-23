const VehicleInfoCard = ({ delivery }) => {
  if (!delivery) return null;

  return (
    <div
      style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "16px",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "14px",
        }}
      >
        🚛 Vehicle Information
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <InfoRow label="Vehicle Number" value={delivery.vehicleNumber} />
        <InfoRow label="Delivery Partner" value={delivery.deliveryPartner} />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      padding: "6px 0",
      borderBottom: "1px solid #f1f5f9",
    }}
  >
    <span style={{ color: "#64748b", fontWeight: "500" }}>{label}</span>
    <span style={{ color: "#0f172a", fontWeight: "600" }}>
      {value || "N/A"}
    </span>
  </div>
);

export default VehicleInfoCard;
