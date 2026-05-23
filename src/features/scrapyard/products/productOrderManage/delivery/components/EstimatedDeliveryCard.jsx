import { formatDeliveryDate } from "../utils/deliveryHelpers";

const EstimatedDeliveryCard = ({ estimatedDelivery }) => {
  const formatted = formatDeliveryDate(estimatedDelivery);

  return (
    <div
      style={{
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <span style={{ fontSize: "32px" }}>📅</span>
      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#3b82f6",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Expected By
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "800",
            color: "#1e40af",
            marginTop: "2px",
          }}
        >
          {formatted}
        </div>
      </div>
    </div>
  );
};

export default EstimatedDeliveryCard;
