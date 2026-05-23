import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  assignDriver,
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
} from "../services/deliveryService";
import {
  getTrackingByTrackingId,
  searchTracking,
} from "../services/trackingService";

// ============================
// FETCH ALL DELIVERIES
// ============================
export const fetchDeliveries = createAsyncThunk(
  "delivery/fetchDeliveries",
  async (_, thunkAPI) => {
    try {
      const response = await getAllDeliveries();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

// ============================
// FETCH DELIVERY BY ID
// ============================
export const fetchDeliveryById = createAsyncThunk(
  "delivery/fetchDeliveryById",
  async (id, thunkAPI) => {
    try {
      const response = await getDeliveryById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

// ============================
// ASSIGN DRIVER
// ============================
export const assignDeliveryDriver = createAsyncThunk(
  "delivery/assignDeliveryDriver",
  async ({ id, driverData }, thunkAPI) => {
    try {
      const response = await assignDriver(id, driverData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

// ============================
// UPDATE DELIVERY STATUS
// ============================
export const updateStatus = createAsyncThunk(
  "delivery/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateDeliveryStatus(id, status);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

// ============================
// FETCH TRACKING BY TRACKING ID
// ============================
export const fetchTrackingByTrackingId = createAsyncThunk(
  "delivery/fetchTrackingByTrackingId",
  async (trackingId, thunkAPI) => {
    try {
      const data = await getTrackingByTrackingId(trackingId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Tracking ID not found");
    }
  },
);

// ============================
// SEARCH TRACKING
// ============================
export const searchDeliveries = createAsyncThunk(
  "delivery/searchDeliveries",
  async (query, thunkAPI) => {
    try {
      const data = await searchTracking(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Search failed");
    }
  },
);
