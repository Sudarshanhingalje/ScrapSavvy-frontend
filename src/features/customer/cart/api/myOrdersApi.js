// src/features/customer/cart/api/myOrdersApi.js

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

export const fetchMyOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/myorders/${userId}`);
  return response.data;
};
