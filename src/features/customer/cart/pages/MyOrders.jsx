// src/features/customer/cart/pages/MyOrders.jsx

import { useState } from "react";

import CustomerSidebar from "../../../../shared/layout/CustomerSidebar";
import useMyOrders from "../hooks/useMyOrders";

import EmptyOrders from "../pages/myOrders/EmptyOrders";
import OrderCard from "../pages/myOrders/OrderCard";
import OrderSkeleton from "../pages/myOrders/OrderSkeleton";

import "../styles/myOrders.css";

const MyOrders = () => {
  const { orders, loading, error } = useMyOrders();

  const [hiddenOrders, setHiddenOrders] = useState([]);

  const handleHideOrder = (orderId) => {
    setHiddenOrders((prev) => [...prev, orderId]);
  };

  const visibleOrders = orders.filter(
    (order) => !hiddenOrders.includes(order.orderId),
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CustomerSidebar />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          background: "#f1f3f6",
          minWidth: 0,
        }}
      >
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track all your purchased scrap products</p>
        </div>

        {loading && (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        )}

        {error && <div className="orders-error">{error}</div>}

        {!loading && !error && visibleOrders.length === 0 && <EmptyOrders />}

        {!loading &&
          !error &&
          visibleOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onHide={handleHideOrder}
            />
          ))}
      </div>
    </div>
  );
};

export default MyOrders;
