// src/features/customer/cart/components/myOrders/OrderCard.jsx

import { useState } from "react";
import { calcOrderTotal, formatCurrency } from "../../utils/myOrderHelpers";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";
import OrderItem from "./OrderItem";
import OrderTracking from "./OrderTracking";

const OrderCard = ({ order, onHide }) => {
  const total = calcOrderTotal(order.items || []);

  const [showTrack, setShowTrack] = useState(false);

  return (
    <div className="order-card">
      <OrderHeader order={order} />

      {order.items.map((item, index) => (
        <OrderItem key={index} item={item} />
      ))}

      <div className="total-section">
        <span className="total-label">Order Total:</span>
        <span className="total-amount">{formatCurrency(total)}</span>
      </div>

      {/* FOOTER */}
      <OrderFooter
        order={order}
        setShowTrack={setShowTrack}
        showTrack={showTrack}
        onHide={onHide}
      />
      {/* TRACKING UI */}
      {showTrack && <OrderTracking currentStatus={order.orderStatus} />}
    </div>
  );
};

export default OrderCard;
