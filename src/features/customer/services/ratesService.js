import { API_BASE_URL } from "../../../config/env";

export const fetchCustomerRates = async (ownerId) => {
  const res = await fetch(`${API_BASE_URL}/api/prices/all?ownerId=${ownerId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch rates");
  }

  return res.json();
};
