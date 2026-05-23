// ==============================
// FILE: DriverInfoCard.jsx
// ==============================

const DriverInfoCard = ({ delivery }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <h3>Driver Information</h3>

      <p>
        <strong>Name:</strong> {delivery.driverName || "Not Assigned"}
      </p>

      <p>
        <strong>Phone:</strong> {delivery.driverPhone || "N/A"}
      </p>

      <p>
        <strong>Vehicle:</strong> {delivery.vehicleNumber || "N/A"}
      </p>

      <p>
        <strong>Partner:</strong> {delivery.deliveryPartner || "N/A"}
      </p>
    </div>
  );
};

export default DriverInfoCard;
