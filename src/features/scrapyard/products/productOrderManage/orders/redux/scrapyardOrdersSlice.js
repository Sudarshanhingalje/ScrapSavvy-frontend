import { createSlice } from "@reduxjs/toolkit";

import {
  getAllOrdersThunk,
  getOrderByIdThunk,
  updateOrderStatusThunk,
} from "./scrapyardOrdersThunks";

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const scrapyardOrdersSlice = createSlice({
  name: "scrapyardOrders",
  initialState,

  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    clearOrdersError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.orderId === action.payload.orderId ? action.payload : order,
        );
        if (
          state.selectedOrder &&
          state.selectedOrder.orderId === action.payload.orderId
        ) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder, clearOrdersError } =
  scrapyardOrdersSlice.actions;

export default scrapyardOrdersSlice.reducer;
