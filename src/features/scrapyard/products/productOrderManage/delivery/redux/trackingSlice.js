import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackingDetails: null,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    setTrackingDetails: (state, action) => {
      state.trackingDetails = action.payload;
    },
  },
});

export const { setTrackingDetails } = trackingSlice.actions;

export default trackingSlice.reducer;
