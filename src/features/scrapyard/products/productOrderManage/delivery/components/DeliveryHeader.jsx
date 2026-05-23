import React from "react";

const DeliveryHeader = ({ deliveries }) => {
  const totalDeliveries = deliveries?.length || 0;

  const deliveredOrders =
    deliveries?.filter((item) => item.deliveryStatus === "DELIVERED").length ||
    0;

  const failedOrders =
    deliveries?.filter((item) => item.deliveryStatus === "FAILED").length || 0;

  const activeDeliveries =
    deliveries?.filter((item) => item.deliveryStatus !== "DELIVERED").length ||
    0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Deliveries</h3>
        <h1>{totalDeliveries}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Active Deliveries</h3>
        <h1>{activeDeliveries}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Delivered</h3>
        <h1>{deliveredOrders}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Failed</h3>
        <h1>{failedOrders}</h1>
      </div>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  background: "#fff",
};

export default DeliveryHeader;
