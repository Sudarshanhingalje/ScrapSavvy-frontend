import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackingDetails: null,
  loading: false,
  error: null,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    setTrackingDetails: (state, action) => {
      state.trackingDetails = action.payload;
    },
    clearTracking: (state) => {
      state.trackingDetails = null;
      state.error = null;
    },
  },
});

export const { setTrackingDetails, clearTracking } = trackingSlice.actions;

export default trackingSlice.reducer;
