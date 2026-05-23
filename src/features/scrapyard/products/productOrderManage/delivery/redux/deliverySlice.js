import { createSlice } from "@reduxjs/toolkit";

import {
  assignDeliveryDriver,
  fetchDeliveries,
  fetchDeliveryById,
  updateStatus,
} from "./deliveryThunk";

const initialState = {
  deliveries: [],
  selectedDelivery: null,
  loading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: "delivery",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ============================
      // FETCH ALL DELIVERIES
      // ============================

      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;

        console.log("REDUX PAYLOAD:", action.payload);

        state.deliveries = Array.isArray(action.payload) ? action.payload : [];

        state.error = null;
      })

      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ============================
      // FETCH DELIVERY BY ID
      // ============================

      .addCase(fetchDeliveryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDeliveryById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedDelivery = action.payload;
      })

      .addCase(fetchDeliveryById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ============================
      // ASSIGN DRIVER
      // ============================

      .addCase(assignDeliveryDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(assignDeliveryDriver.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedDelivery = action.payload;

        state.deliveries = state.deliveries.map((delivery) =>
          delivery.orderId === action.payload.orderId
            ? action.payload
            : delivery,
        );
      })

      .addCase(assignDeliveryDriver.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ============================
      // UPDATE STATUS
      // ============================

      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedDelivery = action.payload;

        state.deliveries = state.deliveries.map((delivery) =>
          delivery.orderId === action.payload.orderId
            ? action.payload
            : delivery,
        );
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default deliverySlice.reducer;
