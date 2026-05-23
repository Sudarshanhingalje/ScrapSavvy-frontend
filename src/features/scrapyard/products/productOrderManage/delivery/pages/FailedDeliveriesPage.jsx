import React from "react";
import { useSelector } from "react-redux";

import DeliveryCard from "../components/DeliveryCard";

const FailedDeliveriesPage = () => {
  const { deliveries } = useSelector((state) => state.delivery);

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.deliveryStatus === "FAILED",
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Failed Deliveries</h1>

      {filteredDeliveries.map((delivery) => (
        <DeliveryCard key={delivery.orderId} delivery={delivery} />
      ))}
    </div>
  );
};

export default FailedDeliveriesPage;
