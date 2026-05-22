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
      setError("User not logged in");
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);

        const data = await fetchMyOrders(user.userId);

        // IMPORTANT: backend response fix safety
        setOrders(Array.isArray(data) ? data : data?.content || []);
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
