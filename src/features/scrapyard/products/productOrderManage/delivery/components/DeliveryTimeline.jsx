// ==============================
// FILE: DeliveryTimeline.jsx
// ==============================

const DeliveryTimeline = ({ status }) => {
  const steps = [
    "PICKUP_PENDING",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Delivery Timeline</h3>

      {steps.map((step) => (
        <div
          key={step}
          style={{
            padding: "10px",
            marginTop: "8px",
            borderRadius: "8px",
            background: step === status ? "#dbeafe" : "#f3f4f6",
          }}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTimeline;
