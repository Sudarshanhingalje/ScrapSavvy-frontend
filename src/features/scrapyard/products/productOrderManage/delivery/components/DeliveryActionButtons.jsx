import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../redux/deliveryThunk";

const STATUS_BUTTONS = [
  {
    status: "PICKED_UP",
    label: "📦 Mark Picked Up",
    bg: "#3b82f6",
    hover: "#2563eb",
  },
  {
    status: "IN_TRANSIT",
    label: "🛣️ Mark In Transit",
    bg: "#0284c7",
    hover: "#0369a1",
  },
  {
    status: "OUT_FOR_DELIVERY",
    label: "🚚 Out For Delivery",
    bg: "#f59e0b",
    hover: "#d97706",
  },
  {
    status: "DELIVERED",
    label: "✅ Mark Delivered",
    bg: "#16a34a",
    hover: "#15803d",
  },
  {
    status: "FAILED",
    label: "❌ Mark Failed",
    bg: "#dc2626",
    hover: "#b91c1c",
  },
];

const DeliveryActionButtons = ({ deliveryId, currentStatus }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.delivery);

  const handleStatusUpdate = (status) => {
    if (
      window.confirm(`Are you sure you want to update status to "${status}"?`)
    ) {
      dispatch(updateStatus({ id: deliveryId, status }));
    }
  };

  // Filter out current and already-passed statuses for logical flow
  const statusOrder = [
    "PICKUP_PENDING",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];
  const currentIdx = statusOrder.indexOf(currentStatus);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      {STATUS_BUTTONS.map((btn) => {
        const btnIdx = statusOrder.indexOf(btn.status);
        const isCurrentOrPast =
          btn.status === currentStatus ||
          (btnIdx <= currentIdx && btn.status !== "FAILED");

        return (
          <button
            key={btn.status}
            onClick={() => handleStatusUpdate(btn.status)}
            disabled={loading || isCurrentOrPast}
            style={{
              padding: "10px 18px",
              background: isCurrentOrPast ? "#e2e8f0" : btn.bg,
              color: isCurrentOrPast ? "#94a3b8" : "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading || isCurrentOrPast ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "13px",
              transition: "background 0.2s",
            }}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
};

export default DeliveryActionButtons;
