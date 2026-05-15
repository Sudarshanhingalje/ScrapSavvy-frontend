export const fetchScrapPrices = async (ownerId) => {
  const res = await fetch(
    `http://localhost:8080/api/prices/all?ownerId=${ownerId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  return res.json();
};

export const createScrapOrder = async (data, token) => {
  const res = await fetch("http://localhost:8080/api/scrap-orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed");
  }

  return res.json();
};
