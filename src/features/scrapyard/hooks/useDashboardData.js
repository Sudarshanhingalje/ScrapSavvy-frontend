// import { useEffect } from "react";

// import { useDispatch } from "react-redux";

// import dashboardService from "../services/dashboardService";

// import {
//   setInventory,
//   setOrders,
//   setPrices,
//   setTransactions,
// } from "../redux/scrapyardSlice";

// const useDashboardData = () => {
//   const dispatch = useDispatch();

//   const ownerId = localStorage.getItem("userId");

//   const fetchData = async () => {
//     try {
//       const [ordersData, inventoryData, transactionsData, pricesData] =
//         await Promise.all([
//           dashboardService.getOrders(ownerId),
//           dashboardService.getInventory(ownerId),
//           dashboardService.getTransactions(ownerId),
//           dashboardService.getPrices(ownerId),
//         ]);

//       dispatch(setOrders(ordersData || []));

//       dispatch(setInventory(inventoryData || []));

//       dispatch(setTransactions(transactionsData || []));

//       const mappedPrices = {};

//       pricesData.forEach((item) => {
//         mappedPrices[item.materialType] = {
//           customer: item.customerPrice,
//           company: item.companyPrice,
//         };
//       });

//       dispatch(setPrices(mappedPrices));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return {
//     refresh: fetchData,
//   };
// };

// export default useDashboardData;
