const STATUS_ORDER = ["PENDING", "ACCEPTED", "PACKED", "SHIPPED", "DELIVERED"];

const STEPS = [
  {
    label: "Order Placed",
    status: "PENDING",
  },
  {
    label: "Accepted",
    status: "ACCEPTED",
  },
  {
    label: "Packed",
    status: "PACKED",
  },
  {
    label: "Shipped",
    status: "SHIPPED",
  },
  {
    label: "Delivered",
    status: "DELIVERED",
  },
];

const OrderTimeline = ({ status, createdAt }) => {
  const currentIndex = STATUS_ORDER.indexOf(status);

  const getStepState = (index) => {
    if (index < currentIndex) return "done";

    if (index === currentIndex) return "current";

    return "future";
  };

  return (
    <div className="od-card od-timeline-card">
      <div className="od-section-title">Order Timeline</div>

      <div className="od-timeline">
        {STEPS.map((step, index) => {
          const state = getStepState(index);

          return (
            <div key={step.status} className={`od-tl-step od-tl-${state}`}>
              <div className="od-tl-dot" />

              <div className="od-tl-label">{step.label}</div>

              <div className="od-tl-time">
                {index === 0
                  ? new Date(createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : state === "done"
                    ? "Completed"
                    : state === "current"
                      ? "In Progress"
                      : "Pending"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
