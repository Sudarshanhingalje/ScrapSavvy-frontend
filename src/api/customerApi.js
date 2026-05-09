const BASE = "http://localhost:8080/api/customer-sell";

export const fetchCustomerOrders = async (customerId) => {
  const res = await fetch(`${BASE}/customer/${customerId}`);
  return res.json();
};
