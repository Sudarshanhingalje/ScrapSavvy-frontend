import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchScrapRates = async (ownerId) => {
  const response = await axios.get(`${BASE_URL}/prices/all?ownerId=${ownerId}`);

  return response.data;
};
