// const API = "http://localhost:8080/api";

// export const getPrices = async (ownerId) => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/prices/all?ownerId=${ownerId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) return [];

//   const text = await res.text();

//   return text ? JSON.parse(text) : [];
// };
