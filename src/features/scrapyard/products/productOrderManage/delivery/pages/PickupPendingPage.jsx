import React from "react";
import { useSelector } from "react-redux";

import DeliveryCard from "../components/DeliveryCard";

const PickupPendingPage = () => {
  const { deliveries } = useSelector((state) => state.delivery);

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.deliveryStatus === "PICKUP_PENDING",
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pickup Pending Orders</h1>

      {filteredDeliveries.map((delivery) => (
        <DeliveryCard key={delivery.orderId} delivery={delivery} />
      ))}
    </div>
  );
};

export default PickupPendingPage;
