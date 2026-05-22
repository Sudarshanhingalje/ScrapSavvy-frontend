const steps = [
  "PENDING",
  "ACCEPTED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "RETURN_REQUESTED",
  "RETURN_APPROVED",
  "REFUNDED",
];

const OrderTracking = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="tracking-container">
      {steps.map((step, index) => (
        <div key={step} className="tracking-step">
          <div className={`circle ${index <= currentIndex ? "active" : ""}`} />

          <div className="label">{step}</div>

          {index !== steps.length - 1 && (
            <div className={`line ${index < currentIndex ? "active" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
