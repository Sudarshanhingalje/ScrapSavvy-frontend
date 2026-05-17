// import { useEffect, useState } from "react";

// import { getInventory } from "../../scrapyard/services/inventoryService";
// import { getOwnerOrders } from "../../scrapyard/services/orderService";
// import { getPrices } from "../../scrapyard/services/priceService";
// import { getTransactions } from "../../scrapyard/services/transactionService";

// const useScrapyardDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [prices, setPrices] = useState({});
//   const [inventory, setInventory] = useState([]);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const ownerId = 2;

//       const [ordersData, pricesData, inventoryData, transactionsData] =
//         await Promise.all([
//           getOwnerOrders(),
//           getPrices(ownerId),
//           getInventory(),
//           getTransactions(),
//         ]);

//       setOrders(ordersData);

//       const priceMap = {};

//       pricesData.forEach((item) => {
//         priceMap[item.materialType] = {
//           customerPrice: item.customerPrice,
//           companyPrice: item.companyPrice,
//         };
//       });

//       setPrices(priceMap);

//       setInventory(inventoryData);

//       setTransactions(transactionsData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return {
//     orders,
//     prices,
//     inventory,
//     transactions,
//   };
// };

// export default useScrapyardDashboard;
