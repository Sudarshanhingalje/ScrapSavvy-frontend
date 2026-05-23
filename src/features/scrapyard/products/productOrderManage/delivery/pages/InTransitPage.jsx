import React from "react";
import { useSelector } from "react-redux";

import DeliveryCard from "../components/DeliveryCard";

const InTransitPage = () => {
  const { deliveries } = useSelector((state) => state.delivery);

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.deliveryStatus === "IN_TRANSIT",
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>In Transit Orders</h1>

      {filteredDeliveries.map((delivery) => (
        <DeliveryCard key={delivery.orderId} delivery={delivery} />
      ))}
    </div>
  );
};

export default InTransitPage;
