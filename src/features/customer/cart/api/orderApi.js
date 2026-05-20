import axios from "axios";
import api from "../../../../shared/services/api";

const BASE_URL = "http://localhost:8080/api/orders";
export const placeOrder = (payload) => {
  return api.post("/orders/place", payload);
};

export const getMyOrders = (userId) => {
  return api.get(`/orders/myorders/${userId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/orders/status/${orderId}?status=${status}`);
};
export const cancelOrder = async (orderId) => {
  return await axios.put(`${BASE_URL}/cancel/${orderId}`);
};
