import api from "../../../../shared/services/api";

// Place order
export const placeOrder = async (payload) => {
  const res = await api.post("/orders/place", payload);
  return res.data;
};

// Update status
export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/orders/status/${orderId}?status=${status}`);
  return res.data;
};

export const getMyOrders = async (userId) => {
  const res = await api.get(`/orders/myorders/${userId}`);
  return res.data;
};

// Get invoice
export const getOrderInvoice = async (orderId) => {
  const res = await api.get(`/scrapyard/invoice/${orderId}`);
  return res.data;
};

// My orders
export const fetchMyOrders = async (userId) => {
  const res = await api.get(`/orders/myorders/${userId}`);
  return res.data;
};

// Cancel order (IMPORTANT FIX PATH)
export const cancelOrder = async (orderId) => {
  const res = await api.put(`/orders/cancel/${orderId}`);
  return res.data;
};
