const DriverInfoCard = ({ delivery }) => {
  if (!delivery) return null;

  const hasDriver = delivery.driverName;

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
        🚗 Driver Information
      </h3>

      {!hasDriver ? (
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>
          No driver assigned yet
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <InfoRow label="Driver Name" value={delivery.driverName} />
          <InfoRow label="Phone" value={delivery.driverPhone} />
          <InfoRow label="Vehicle Number" value={delivery.vehicleNumber} />
          <InfoRow label="Delivery Partner" value={delivery.deliveryPartner} />
          {delivery.assignedAt && (
            <InfoRow
              label="Assigned At"
              value={new Date(delivery.assignedAt).toLocaleString("en-IN")}
            />
          )}
        </div>
      )}
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

export default DriverInfoCard;
