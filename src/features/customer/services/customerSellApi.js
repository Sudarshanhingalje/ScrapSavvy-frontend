import { API_BASE_URL } from "../../../config/env";

export const createCustomerSellOrder = async (formData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/customer-sell/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Order failed");
  }

  return res.json();
};
