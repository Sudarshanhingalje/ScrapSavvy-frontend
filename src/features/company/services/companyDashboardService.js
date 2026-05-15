import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchLivePrices = async () => {
  const response = await axios.get(`${BASE_URL}/prices/all?ownerId=2`);

  return response.data;
};
