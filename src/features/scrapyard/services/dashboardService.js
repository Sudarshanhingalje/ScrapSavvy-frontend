const updatePrice = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/prices/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update price");
  }

  return await res.json();
};

export default {
  updatePrice,
};
