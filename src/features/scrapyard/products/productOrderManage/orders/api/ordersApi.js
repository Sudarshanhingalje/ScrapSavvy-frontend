import axios from "axios";

const BASE_URL = "http://localhost:8080/api/scrapyard";

export const getAllOrdersApi = () => {
  return axios.get(`${BASE_URL}/orders`);
};

export const getOrderByIdApi = (orderId) => {
  return axios.get(`${BASE_URL}/orders/${orderId}`);
};

export const updateOrderStatusApi = (orderId, status) => {
  return axios.put(`${BASE_URL}/orders/${orderId}/status`, {
    status,
  });
};
