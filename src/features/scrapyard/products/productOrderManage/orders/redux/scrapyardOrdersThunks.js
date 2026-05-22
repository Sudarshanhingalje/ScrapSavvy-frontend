import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllOrders,
  fetchOrderById,
  updateOrderStatus,
} from "../services/ordersService";

export const getAllOrdersThunk = createAsyncThunk(
  "scrapyardOrders/getAll",
  async (_, thunkAPI) => {
    try {
      return await fetchAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const getOrderByIdThunk = createAsyncThunk(
  "scrapyardOrders/getById",
  async (orderId, thunkAPI) => {
    try {
      return await fetchOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

export const updateOrderStatusThunk = createAsyncThunk(
  "scrapyardOrders/updateStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      return await updateOrderStatus(orderId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);
