import { createSlice } from "@reduxjs/toolkit";
import { getScrapRates } from "./scrapRatesThunk";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const scrapRatesSlice = createSlice({
  name: "scrapRates",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getScrapRates.pending, (state) => {
        state.loading = true;
      })

      .addCase(getScrapRates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getScrapRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default scrapRatesSlice.reducer;
