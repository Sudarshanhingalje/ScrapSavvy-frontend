// import api from "../api/api";

// export const createRazorpayOrder = (amount) => {
//   return api.post("/payment/createorder", { amount });
// };
import api from "../../../../shared/services/api";

// ✅ Send total in RUPEES — backend converts to paise
export const createRazorpayOrder = async (totalInRupees) => {
  const res = await api.post("/payment/createorder", {
    amount: totalInRupees, // e.g. 684.40 — backend does × 100
  });
  return res;
};
