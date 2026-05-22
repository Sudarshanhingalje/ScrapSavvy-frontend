import {
  getAllOrdersApi,
  getOrderByIdApi,
  updateOrderStatusApi,
} from "../api/ordersApi";

export const fetchAllOrders = async () => {
  const response = await getAllOrdersApi();
  return response.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await getOrderByIdApi(orderId);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await updateOrderStatusApi(orderId, status);
  return response.data;
};
