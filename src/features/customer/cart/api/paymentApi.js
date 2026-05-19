import api from "./api";

export const createRazorpayOrder = (amount) => {
  return api.post("/payment/create-order", { amount });
};
