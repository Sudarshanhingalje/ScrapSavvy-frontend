import axios from "axios";
import { API_BASE_URL } from "../../../config/env";

export const getAllProductsApi = async (token) => {
  const res = await axios.get(
    `${API_BASE_URL}/api/scrapyard/get_all_products`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
