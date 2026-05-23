import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/delivery";

// ============================
// GET ALL DELIVERIES
// ============================

export const getAllDeliveries = async () => {
  return await axios.get(API_BASE_URL);
};

// ============================
// GET DELIVERY BY ID
// ============================

export const getDeliveryById = async (id) => {
  return await axios.get(`${API_BASE_URL}/${id}`);
};

// ============================
// ASSIGN DRIVER
// ============================

export const assignDriver = async (id, driverData) => {
  return await axios.put(`${API_BASE_URL}/assign-driver/${id}`, driverData);
};

// ============================
// UPDATE DELIVERY STATUS
// ============================

export const updateDeliveryStatus = async (id, status) => {
  return await axios.put(`${API_BASE_URL}/status/${id}`, {
    deliveryStatus: status,
  });
};
