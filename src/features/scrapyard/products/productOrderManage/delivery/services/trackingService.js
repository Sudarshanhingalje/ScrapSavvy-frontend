import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/delivery";

// ============================
// GET TRACKING BY TRACKING ID (search through all orders)
// ============================
export const getTrackingByTrackingId = async (trackingId) => {
  // Backend doesn't have a dedicated tracking endpoint,
  // so we fetch all and find by trackingId
  const response = await axios.get(API_BASE_URL);
  const orders = response.data;
  const found = orders.find(
    (o) => o.trackingId?.toLowerCase() === trackingId?.toLowerCase(),
  );
  if (!found) throw new Error("Tracking ID not found");
  return found;
};

// ============================
// SEARCH TRACKING (by trackingId, orderId, or customer name)
// ============================
export const searchTracking = async (query) => {
  const response = await axios.get(API_BASE_URL);
  const orders = response.data;
  const q = query?.toLowerCase() || "";
  return orders.filter(
    (o) =>
      o.trackingId?.toLowerCase().includes(q) ||
      String(o.orderId).includes(q) ||
      o.userProfile?.name?.toLowerCase().includes(q) ||
      o.userProfile?.fullName?.toLowerCase().includes(q),
  );
};
