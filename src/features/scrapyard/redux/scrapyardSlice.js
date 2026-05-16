import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  inventory: [],
  transactions: [],
  prices: {},

  loading: false,
  error: null,
};

const scrapyardSlice = createSlice({
  name: "scrapyard",

  initialState,

  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setInventory: (state, action) => {
      state.inventory = action.payload;
    },

    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },

    setPrices: (state, action) => {
      state.prices = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  setInventory,
  setTransactions,
  setPrices,
  setLoading,
  setError,
} = scrapyardSlice.actions;

export default scrapyardSlice.reducer;
