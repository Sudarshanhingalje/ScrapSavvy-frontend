import React from "react";

const OrderStatusBadge = ({ status }) => {
  return (
    <span className={`order-status-badge ${status?.toLowerCase()}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
