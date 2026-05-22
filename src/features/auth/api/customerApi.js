const BASE = "http://localhost:8080/api/customersell";

export const fetchCustomerOrders = async (customerId) => {
  const res = await fetch(`${BASE}/customer/${customerId}`);
  return res.json();
};
