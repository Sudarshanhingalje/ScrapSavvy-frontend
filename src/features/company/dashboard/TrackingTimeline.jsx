const steps = [
  "PENDING",
  "ACCEPTED",
  "SCHEDULED",
  "OUT_FOR_PICKUP",
  "COMPLETED",
];

const TrackingTimeline = ({ status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-3">
      <b>Live Tracking:</b>

      <div
        style={{
          marginTop: "8px",
          fontSize: "13px",
        }}
      >
        {steps.map((step, index) => {
          const isActive = currentStep >= index;

          return (
            <div
              key={step}
              style={{
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  color: isActive ? "green" : "#aaa",
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {isActive ? "✔" : "○"} {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
