import api from "../../../customer/cart/api/api";

export const placeOrder = (payload) => {
  return api.post("/orders/place", payload);
};

export const getMyOrders = (userId) => {
  return api.get(`/orders/my-orders/${userId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/orders/status/${orderId}?status=${status}`);
};
