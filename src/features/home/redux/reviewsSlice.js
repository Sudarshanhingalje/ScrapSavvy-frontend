// src/features/reviews/redux/reviewsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getOwnerReviews } from "./reviewsThunk";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    data: [], // ReviewResponse[]
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerReviews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOwnerReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getOwnerReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
