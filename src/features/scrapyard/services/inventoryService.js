const API = "http://localhost:8080/api";

export const getInventory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/inventory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const text = await res.text();

  return text ? JSON.parse(text) : [];
};
