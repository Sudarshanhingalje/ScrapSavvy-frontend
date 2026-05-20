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

  // ✅ ADD THIS
  const [hiddenOrders, setHiddenOrders] = useState([]);

  // ✅ HIDE HANDLER
  const handleHideOrder = (orderId) => {
    setHiddenOrders((prev) => [...prev, orderId]);
  };

  // ✅ FILTER ORDERS
  const visibleOrders = orders.filter(
    (order) => !hiddenOrders.includes(order.orderId),
  );

  return (
    <div className="orders-layout">
      <CustomerSidebar />

      <div className="orders-content">
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
              onHide={handleHideOrder} // ✅ IMPORTANT FIX
            />
          ))}
      </div>
    </div>
  );
};

export default MyOrders;
