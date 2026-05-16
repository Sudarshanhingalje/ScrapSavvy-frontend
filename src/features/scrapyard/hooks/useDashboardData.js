import { useEffect, useState } from "react";

import dashboardService from "../services/dashboardService";

const useDashboardData = () => {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [prices, setPrices] = useState({});

  const ownerId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const [ordersData, inventoryData, transactionsData, pricesData] =
        await Promise.all([
          dashboardService.getOrders(ownerId),
          dashboardService.getInventory(ownerId),
          dashboardService.getTransactions(ownerId),
          dashboardService.getPrices(ownerId),
        ]);

      setOrders(ordersData || []);
      setInventory(inventoryData || []);
      setTransactions(transactionsData || []);

      const mappedPrices = {};

      pricesData.forEach((item) => {
        mappedPrices[item.materialType] = {
          customer: item.customerPrice,
          company: item.companyPrice,
        };
      });

      setPrices(mappedPrices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    orders,
    inventory,
    transactions,
    prices,
    refresh: fetchData,
  };
};

export default useDashboardData;
