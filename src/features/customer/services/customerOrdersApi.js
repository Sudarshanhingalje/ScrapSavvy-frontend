import { API_BASE_URL } from "../../../config/env";

export const fetchCustomerOrders = async (customerId, token) => {
  const res = await fetch(
    `${API_BASE_URL}/api/customersell/customer/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const text = await res.text();

  return text ? JSON.parse(text) : [];
};
