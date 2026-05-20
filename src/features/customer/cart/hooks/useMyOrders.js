// src/features/customer/cart/hooks/useMyOrders.js

import { useEffect, useState } from "react";
import { fetchMyOrders } from "../api/myOrdersApi";

const useMyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders(user.userId);
        setOrders(data);
      } catch (err) {
        console.error("ORDER FETCH ERROR", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, loading, error };
};

export default useMyOrders;
