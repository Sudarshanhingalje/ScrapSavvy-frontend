const BASE_URL = "http://localhost:8080/api/scrap-orders";

const getToken = () => localStorage.getItem("token");

export const fetchOwnerOrders = async () => {
  const res = await fetch(`${BASE_URL}/owner`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const fetchAllOrders = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}/status?status=${status}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const scheduleOrder = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}/schedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteOrder = async (id) => {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
