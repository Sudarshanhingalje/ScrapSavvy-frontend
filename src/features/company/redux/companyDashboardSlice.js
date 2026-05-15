import { createSlice } from "@reduxjs/toolkit";

import { getLivePrices } from "./companyDashboardThunk";

const initialState = {
  prices: {},
  loading: false,
  error: null,
};

const companyDashboardSlice = createSlice({
  name: "companyDashboard",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLivePrices.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLivePrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })

      .addCase(getLivePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default companyDashboardSlice.reducer;
