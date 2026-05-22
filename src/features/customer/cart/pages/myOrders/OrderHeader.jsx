// src/features/customer/cart/components/myOrders/OrderHeader.jsx

import { formatOrderDate } from "../../utils/myOrderHelpers";
import StatusChip from "./StatusChip";

const OrderHeader = ({ order }) => {
  const isPaid = order.paymentStatus?.toUpperCase() === "PAID";

  return (
    <div className="order-top">
      <div className="order-meta-group">
        <div>
          <div className="meta-label">Order ID</div>
          <span className="order-id-tag">#{order.orderId}</span>
        </div>
        <div className="order-meta">
          <span className="meta-label">Ordered On</span>
          <span className="meta-val">{formatOrderDate(order.createdAt)}</span>
        </div>
        <div className="order-meta">
          <span className="meta-label">Payment</span>
          {/* <span
            className="meta-val"
            style={{ color: isPaid ? "#2e7d32" : "#f57f17" }}
          >
            {isPaid ? "Paid" : "Pending"}{" "}
            <span className={isPaid ? "pay-badge" : "cod-badge"}>
              {order.paymentStatus?.toUpperCase()}
            </span>
          </span> */}
          <div
            className={`pay-badge ${
              order.paymentStatus === "REFUNDED"
                ? "status-refund"
                : order.paymentStatus === "FAILED"
                  ? "status-failed"
                  : "status-paid"
            }`}
          >
            {order.paymentStatus}
          </div>
        </div>
      </div>
      <StatusChip status={order.orderStatus} />
    </div>
  );
};

export default OrderHeader;
