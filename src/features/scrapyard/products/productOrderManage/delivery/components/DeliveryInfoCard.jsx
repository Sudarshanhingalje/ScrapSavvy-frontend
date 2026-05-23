import {
  formatAmount,
  formatDeliveryDate,
  getCustomerName,
} from "../utils/deliveryHelpers";
import DeliveryStatusBadge from "./DeliveryStatusBadge";

const DeliveryInfoCard = ({ delivery }) => {
  if (!delivery) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "24px",
        marginBottom: "16px",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "16px",
        }}
      >
        📋 Order Information
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InfoRow label="Order ID" value={`#${delivery.orderId}`} />
        <InfoRow label="Tracking ID" value={delivery.trackingId} mono />
        <InfoRow label="Customer" value={getCustomerName(delivery)} />
        <InfoRow
          label="Total Amount"
          value={formatAmount(delivery.totalAmount)}
        />
        <InfoRow
          label="Delivery Status"
          value={<DeliveryStatusBadge status={delivery.deliveryStatus} />}
        />
        <InfoRow
          label="Est. Delivery"
          value={formatDeliveryDate(delivery.estimatedDelivery)}
        />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, mono }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "14px",
      padding: "8px 0",
      borderBottom: "1px solid #f1f5f9",
    }}
  >
    <span style={{ color: "#64748b", fontWeight: "500" }}>{label}</span>
    <span
      style={{
        color: "#0f172a",
        fontWeight: "600",
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: mono ? "12px" : "14px",
      }}
    >
      {value || "N/A"}
    </span>
  </div>
);

export default DeliveryInfoCard;
