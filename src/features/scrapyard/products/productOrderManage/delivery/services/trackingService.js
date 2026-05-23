import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/delivery";

export const getTrackingById = async (trackingId) => {
  const response = await axios.get(`${API_BASE_URL}/tracking/${trackingId}`);

  return response.data;
};
