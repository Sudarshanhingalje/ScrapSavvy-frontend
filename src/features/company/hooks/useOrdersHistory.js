import { useEffect, useState } from "react";

const useOrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOrders([]);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/scrap-orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    orders,
  };
};

export default useOrdersHistory;
