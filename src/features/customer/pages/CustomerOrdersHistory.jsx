import { useEffect, useState } from "react";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

import "../styles/CustomerOrdersHistory.css";

import OrderCard from "../orders/OrderCard";
import OrdersEmpty from "../orders/OrdersEmpty";
import OrdersLoading from "../orders/OrdersLoading";

import { fetchCustomerOrders } from "../services/customerOrdersApi";

const CustomerOrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerId = localStorage.getItem("userId");

    const token = localStorage.getItem("token");

    if (!customerId) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchCustomerOrders(customerId, token);

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();

    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="co-layout">
      <CustomerSidebar />

      <div className="co-main">
        <div className="co-page-header">
          <h2 className="co-page-header__title">📦 Track Scrap Orders</h2>

          <p className="co-page-header__subtitle">
            Track your scrap pickup requests
          </p>

          <hr className="co-page-header__divider" />
        </div>

        {loading && <OrdersLoading />}

        {!loading && orders.length === 0 && <OrdersEmpty />}

        {!loading && orders.length > 0 && (
          <div className="co-orders-grid">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersHistory;
