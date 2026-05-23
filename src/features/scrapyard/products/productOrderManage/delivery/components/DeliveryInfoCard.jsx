const DeliveryInfoCard = ({ delivery }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h3>Delivery Information</h3>

      <p>
        <strong>Order ID:</strong> {delivery?.orderId}
      </p>

      <p>
        <strong>Tracking ID:</strong> {delivery?.trackingId}
      </p>

      <p>
        <strong>Customer:</strong> {delivery?.customerName}
      </p>

      <p>
        <strong>Status:</strong> {delivery?.deliveryStatus}
      </p>

      <p>
        <strong>Estimated Delivery:</strong> {delivery?.estimatedDelivery}
      </p>
    </div>
  );
};

export default DeliveryInfoCard;
