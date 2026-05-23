import React from "react";

import DeliveryStatusBadge from "./DeliveryStatusBadge";

const DeliveryTable = ({ deliveries, onViewDetails }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Tracking ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Estimated Delivery</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {deliveries?.map((delivery) => (
          <tr key={delivery.orderId}>
            <td>{delivery.trackingId}</td>

            <td>{delivery.customerName}</td>

            <td>
              <DeliveryStatusBadge status={delivery.deliveryStatus} />
            </td>

            <td>{delivery.estimatedDelivery}</td>

            <td>
              <button onClick={() => onViewDetails(delivery.orderId)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeliveryTable;
