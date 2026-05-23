import { useSelector } from "react-redux";

import DeliveryCard from "../components/DeliveryCard";

const OutForDeliveryPage = () => {
  const { deliveries } = useSelector((state) => state.delivery);

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.deliveryStatus === "OUT_FOR_DELIVERY",
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Out For Delivery Orders</h1>

      {filteredDeliveries.map((delivery) => (
        <DeliveryCard key={delivery.orderId} delivery={delivery} />
      ))}
    </div>
  );
};

export default OutForDeliveryPage;
