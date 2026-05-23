import {
  DELIVERY_STATUS_COLORS,
  DELIVERY_STATUS_LABELS,
} from "../utils/deliveryStatus";

const DeliveryStatusBadge = ({ status }) => {
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
        border: `1.5px solid ${colors.border}`,
        padding: "4px 12px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: "700",
        display: "inline-block",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
};

export default DeliveryStatusBadge;
