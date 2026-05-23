const EstimatedDeliveryCard = ({ estimatedDelivery }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h3>Estimated Delivery</h3>

      <p>{estimatedDelivery || "N/A"}</p>
    </div>
  );
};

export default EstimatedDeliveryCard;
