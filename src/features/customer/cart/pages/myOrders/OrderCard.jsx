// src/features/customer/cart/components/myOrders/OrderCard.jsx

import { useState } from "react";
import { formatCurrency } from "../../utils/myOrderHelpers";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";
import OrderItem from "./OrderItem";
import OrderTracking from "./OrderTracking";

const OrderCard = ({ order, onHide }) => {
  const [showTrack, setShowTrack] = useState(false);

  // ── Use backend total_amount as the single source of truth ──
  // The backend stores: subtotal + cgst + sgst = total_amount
  // Never recalculate from items — items only hold priceAtPurchase (subtotal portion)
  const subtotal = Number(order.subtotal || 0);
  const cgst = Number(order.cgst || 0);
  const sgst = Number(order.sgst || 0);
  const totalAmount = Number(order.totalAmount || 0);

  const hasGST = cgst > 0 || sgst > 0;

  return (
    <div className="order-card">
      <OrderHeader order={order} />

      {order.items.map((item, index) => (
        <OrderItem key={index} item={item} />
      ))}

      {/* ── Price Breakdown ── */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        {/* Subtotal row — only show when GST is present so user sees the breakdown */}
        {hasGST && subtotal > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        )}

        {/* GST rows */}
        {hasGST && (
          <>
            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              <span>CGST</span>
              <span>{formatCurrency(cgst)}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              <span>SGST</span>
              <span>{formatCurrency(sgst)}</span>
            </div>
            <div
              style={{
                width: "160px",
                borderTop: "1px dashed #e2e8f0",
                margin: "4px 0",
              }}
            />
          </>
        )}

        {/* Grand Total — always use order.totalAmount from backend */}
        <div className="total-section" style={{ padding: 0 }}>
          <span className="total-label">Order Total:</span>
          <span className="total-amount">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* FOOTER */}
      <OrderFooter
        order={order}
        setShowTrack={setShowTrack}
        showTrack={showTrack}
        onHide={onHide}
      />

      {/* TRACKING UI */}
      {showTrack && (
        <OrderTracking
          currentStatus={order.orderStatus}
          orderId={order.orderId}
        />
      )}
    </div>
  );
};

export default OrderCard;
