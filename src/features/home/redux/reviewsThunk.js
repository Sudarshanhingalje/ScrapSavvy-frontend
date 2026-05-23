// src/features/reviews/redux/reviewsThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getOwnerReviews = createAsyncThunk(
  "reviews/getOwnerReviews",
  async (ownerProfileId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/reviews/owner/${ownerProfileId}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load reviews");
    }
  },
);
