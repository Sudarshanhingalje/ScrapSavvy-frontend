// import { useEffect, useState } from "react";

// import { fetchCustomerRates } from "../services/ratesService";

// const useLiveRates = () => {
//   const [dailyRates, setDailyRates] = useState({});

//   useEffect(() => {
//     const ownerId = 2;

//     const loadRates = async () => {
//       try {
//         const data = await fetchCustomerRates(ownerId);

//         const mapped = {};

//         data.forEach((item) => {
//           mapped[item.materialType] = {
//             customerPrice: item.customerPrice,
//             companyPrice: item.companyPrice,
//           };
//         });

//         setDailyRates(mapped);
//       } catch (err) {
//         console.error(err);
//         setDailyRates({});
//       }
//     };

//     loadRates();

//     const interval = setInterval(loadRates, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return {
//     dailyRates,
//   };
// };

// export default useLiveRates;
