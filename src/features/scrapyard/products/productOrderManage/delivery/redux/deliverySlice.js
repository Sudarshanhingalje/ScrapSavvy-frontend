import { createSlice } from "@reduxjs/toolkit";

import {
  assignDeliveryDriver,
  fetchDeliveries,
  fetchDeliveryById,
  fetchTrackingByTrackingId,
  searchDeliveries,
  updateStatus,
} from "./deliveryThunk";

const initialState = {
  deliveries: [],
  selectedDelivery: null,
  trackingResult: null,
  searchResults: [],
  loading: false,
  trackingLoading: false,
  searchLoading: false,
  error: null,
  trackingError: null,
  searchError: null,
  successMessage: null,
};

const deliverySlice = createSlice({
  name: "delivery",

  initialState,

  reducers: {
    clearDeliveryMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSelectedDelivery: (state) => {
      state.selectedDelivery = null;
    },
    clearTrackingResult: (state) => {
      state.trackingResult = null;
      state.trackingError = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
  },

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
        state.error = null;
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
        state.successMessage = "Driver assigned successfully!";
        state.deliveries = state.deliveries.map((d) =>
          d.orderId === action.payload.orderId ? action.payload : d,
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
        state.successMessage = "Delivery status updated!";
        state.deliveries = state.deliveries.map((d) =>
          d.orderId === action.payload.orderId ? action.payload : d,
        );
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ============================
      // FETCH TRACKING BY TRACKING ID
      // ============================

      .addCase(fetchTrackingByTrackingId.pending, (state) => {
        state.trackingLoading = true;
        state.trackingError = null;
      })

      .addCase(fetchTrackingByTrackingId.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.trackingResult = action.payload;
        state.trackingError = null;
      })

      .addCase(fetchTrackingByTrackingId.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingError = action.payload;
        state.trackingResult = null;
      })

      // ============================
      // SEARCH DELIVERIES
      // ============================

      .addCase(searchDeliveries.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })

      .addCase(searchDeliveries.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
        state.searchError = null;
      })

      .addCase(searchDeliveries.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const {
  clearDeliveryMessages,
  clearSelectedDelivery,
  clearTrackingResult,
  clearSearchResults,
} = deliverySlice.actions;

export default deliverySlice.reducer;
