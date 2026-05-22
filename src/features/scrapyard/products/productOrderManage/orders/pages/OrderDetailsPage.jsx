import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useOrders from "../hooks/useOrders";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";
import BuyerInfoCard from "../components/BuyerInfoCard";
import OrderItemsTable from "../components/OrderItemsTable";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderTimeline from "../components/OrderTimeline";

import "../styles/orderDetails.css";

const OrderDetailsPage = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const { selectedOrder, loading, error, fetchOrderById, updateStatus } =
    useOrders();

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  const handleStatusUpdate = (status) => {
    updateStatus(orderId, status);
  };

  if (loading) {
    return (
      <div className="od-layout">
        <ScrapyardSidebar />

        <div className="od-content">
          <div className="od-loading">Loading order...</div>
        </div>
      </div>
    );
  }

  if (error || !selectedOrder) {
    return (
      <div className="od-layout">
        <ScrapyardSidebar />

        <div className="od-content">
          <div className="od-error">{error || "Order not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="od-layout">
      <ScrapyardSidebar />

      <div className="od-content">
        <div className="od-page">
          {/* TOP NAV */}
          <div className="od-topnav">
            <div className="od-breadcrumb">
              <span
                className="od-breadcrumb-link"
                onClick={() => navigate("/scrapyard/orders")}
              >
                Orders
              </span>

              <span className="od-breadcrumb-sep">›</span>

              <span className="od-breadcrumb-cur">
                Order #{selectedOrder.orderId}
              </span>
            </div>

            <div className="od-top-actions">
              <button className="od-btn" onClick={() => navigate(-1)}>
                ← Back
              </button>

              <button
                className="od-btn od-btn-danger"
                onClick={() => handleStatusUpdate("CANCELLED")}
              >
                Cancel Order
              </button>

              {selectedOrder.orderStatus === "PENDING" &&
                selectedOrder.paymentStatus === "PAID" && (
                  <button
                    className="od-btn od-btn-green"
                    onClick={() => handleStatusUpdate("ACCEPTED")}
                  >
                    Accept Order
                  </button>
                )}
            </div>
          </div>

          {/* HERO */}
          <div className="od-hero">
            <div className="od-hero-left">
              <h1>Order #{selectedOrder.orderId}</h1>

              <p>
                Placed on{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="od-hero-right">
              <OrderStatusBadge status={selectedOrder.orderStatus} />

              <span
                className={`od-payment-badge ${selectedOrder.paymentStatus?.toLowerCase()}`}
              >
                {selectedOrder.paymentStatus}
              </span>

              <span
                className={`od-type-tag ${
                  selectedOrder.buyerType === "COMPANY"
                    ? "od-tag-company"
                    : "od-tag-customer"
                }`}
              >
                {selectedOrder.buyerType === "COMPANY"
                  ? "Company Order"
                  : "Customer Order"}
              </span>
            </div>
          </div>

          {/* GRID */}
          <div className="od-grid2">
            {/* TIMELINE */}
            <OrderTimeline
              status={selectedOrder.orderStatus}
              createdAt={selectedOrder.createdAt}
            />

            {/* BUYER */}
            <BuyerInfoCard order={selectedOrder} />

            {/* ITEMS */}
            <OrderItemsTable
              items={selectedOrder.items}
              totalAmount={selectedOrder.totalAmount}
            />
          </div>

          {/* STATUS CARD */}
          <div className="od-status-card">
            <div className="od-section-title">Update Order Status</div>

            <div className="od-status-btns">
              <button
                className="od-s-btn od-s-accept"
                onClick={() => handleStatusUpdate("ACCEPTED")}
              >
                Accept
              </button>

              <button
                className="od-s-btn od-s-cancel"
                onClick={() => handleStatusUpdate("REJECTED")}
              >
                Reject
              </button>

              <button
                className="od-s-btn od-s-pack"
                onClick={() => handleStatusUpdate("PACKED")}
              >
                Packed
              </button>

              <button
                className="od-s-btn od-s-ship"
                onClick={() => handleStatusUpdate("SHIPPED")}
              >
                Shipped
              </button>

              <button
                className="od-s-btn od-s-deliver"
                onClick={() => handleStatusUpdate("DELIVERED")}
              >
                Delivered
              </button>

              <button
                className="od-s-btn od-s-cancel"
                onClick={() => handleStatusUpdate("CANCELLED")}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
