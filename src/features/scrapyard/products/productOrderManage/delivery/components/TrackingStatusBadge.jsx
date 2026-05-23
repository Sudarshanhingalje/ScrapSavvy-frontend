import {
  DELIVERY_STATUS_COLORS,
  DELIVERY_STATUS_LABELS,
} from "../utils/deliveryStatus";

const TrackingStatusBadge = ({ status }) => {
  if (!status) return null;

  const colors = DELIVERY_STATUS_COLORS[status] || {
    bg: "#f1f5f9",
    color: "#475569",
    border: "#e2e8f0",
  };

  const label = DELIVERY_STATUS_LABELS[status] || status;

  return (
    <span
      style={{
        backgroundColor: colors.bg,
        color: colors.color,
        border: `2px solid ${colors.border}`,
        padding: "6px 16px",
        borderRadius: "100px",
        fontSize: "14px",
        fontWeight: "700",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
};

export default TrackingStatusBadge;
