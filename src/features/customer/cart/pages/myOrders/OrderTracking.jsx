// src/features/customer/cart/pages/myOrders/OrderTracking.jsx

const STEPS = [
  { key: "PENDING", icon: "⏳", label: "Pending" },
  { key: "ACCEPTED", icon: "✅", label: "Accepted" },
  { key: "PACKED", icon: "📦", label: "Packed" },
  { key: "SHIPPED", icon: "🚚", label: "Shipped" },
  { key: "DELIVERED", icon: "🏠", label: "Delivered" },
];

const OrderTracking = ({ currentStatus }) => {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="tracking-panel">
      <div className="tracking-title">Shipment Timeline</div>
      <div className="steps-row">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step.key} className="step-wrap">
              {/* connector line between steps */}
              {index < STEPS.length - 1 && (
                <div
                  className={`connector ${
                    isDone
                      ? "connector-done"
                      : isCurrent
                        ? "connector-active"
                        : ""
                  }`}
                />
              )}

              {/* circle */}
              <div
                className={`step-circle ${
                  isCurrent
                    ? "step-current"
                    : isDone
                      ? "step-done"
                      : "step-pending"
                }`}
              >
                <span className="step-icon">{step.icon}</span>
              </div>

              {/* label */}
              <div
                className={`step-label ${
                  isCurrent ? "label-current" : isDone ? "label-done" : ""
                }`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
