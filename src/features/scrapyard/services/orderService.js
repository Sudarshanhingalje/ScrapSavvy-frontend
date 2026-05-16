const API = "http://localhost:8080/api";

export const getOwnerOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/scrap-orders/owner`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const text = await res.text();

  return text ? JSON.parse(text) : [];
};
