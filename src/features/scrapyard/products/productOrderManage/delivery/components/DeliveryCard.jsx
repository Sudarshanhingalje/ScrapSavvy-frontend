import DeliveryStatusBadge from "./DeliveryStatusBadge";
import TrackingIdBadge from "./TrackingIdBadge";

const DeliveryCard = ({ delivery, onViewDetails }) => {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "20px",
        background: "#ffffff",
      }}
    >
      <h3>Order #{delivery.orderId}</h3>

      <TrackingIdBadge trackingId={delivery.trackingId} />

      <div style={{ marginTop: "12px" }}>
        <DeliveryStatusBadge status={delivery.deliveryStatus} />
      </div>

      <p style={{ marginTop: "12px" }}>
        <strong>Customer:</strong> {delivery.customerName}
      </p>

      <p>
        <strong>Estimated Delivery:</strong> {delivery.estimatedDelivery}
      </p>

      <button
        onClick={() => onViewDetails(delivery.orderId)}
        style={{
          marginTop: "14px",
          padding: "10px 16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default DeliveryCard;
