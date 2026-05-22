import OrderStatusBadge from "./OrderStatusBadge";

import { formatDate, formatPrice, getTotalItems } from "../utils/orderHelpers";

const OrderRow = ({
  order,
  isSelected,
  isCleared,
  onSelect,
  onView,
  onClear,
  clearable,
}) => {
  return (
    <tr
      className={`${isSelected ? "row-selected" : ""} ${isCleared ? "row-cleared" : ""}`}
    >
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(order.orderId)}
        />
      </td>

      <td className="cell-id">#{order.orderId}</td>

      <td>
        <div className="buyer-cell">
          <div
            className={`buyer-avatar ${order.buyerType === "COMPANY" ? "av-company" : "av-person"}`}
          >
            {order.buyerName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="buyer-name">{order.buyerName}</div>
          </div>
        </div>
      </td>

      <td>
        <span
          className={`type-tag ${order.buyerType === "COMPANY" ? "tag-company" : "tag-customer"}`}
        >
          {order.buyerType === "COMPANY" ? "Company" : "Customer"}
        </span>
      </td>

      <td className="cell-muted">{getTotalItems(order.items)}</td>

      <td className="cell-amount">{formatPrice(order.totalAmount)}</td>

      <td>
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      <td>
        <span className={`payment-badge ${order.paymentStatus?.toLowerCase()}`}>
          {order.paymentStatus}
        </span>
      </td>

      <td className="cell-muted">{formatDate(order.createdAt)}</td>

      <td>
        <button className="view-btn" onClick={() => onView(order.orderId)}>
          View
        </button>

        {/* ✅ Clear button — only shows for DELIVERED/COMPLETED/CANCELLED/REJECTED */}
        {clearable && !isCleared && (
          <button
            className="clear-btn"
            title="Clear from view (order stays in DB)"
            onClick={() => onClear(order.orderId)}
          >
            🗑clear
          </button>
        )}

        {/* ✅ Cleared label — only shows in "Show Cleared" mode */}
        {isCleared && <span className="cleared-tag">Cleared</span>}
      </td>
    </tr>
  );
};

export default OrderRow;
