const timelineSteps = [
  "ORDER_CONFIRMED",
  "PACKED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const TrackingTimeline = ({ currentStatus }) => {
  const currentIndex = timelineSteps.indexOf(currentStatus);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Tracking Timeline</h3>

      {timelineSteps.map((step, index) => (
        <div
          key={step}
          style={{
            borderLeft: "4px solid",
            borderColor: index <= currentIndex ? "#16a34a" : "#cbd5e1",
            padding: "12px",
            marginBottom: "10px",
            background: "#f8fafc",
          }}
        >
          {index <= currentIndex ? "✓" : "○"} {step}
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
