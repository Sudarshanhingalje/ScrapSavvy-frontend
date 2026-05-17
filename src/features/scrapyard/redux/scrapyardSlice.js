import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInventory } from "../services/inventoryService";
import { getOwnerOrders } from "../services/orderService";
import { getTransactions } from "../services/transactionService";

export const fetchOrders = createAsyncThunk("scrapyard/orders", async () => {
  return await getOwnerOrders();
});

export const fetchInventory = createAsyncThunk(
  "scrapyard/inventory",
  async () => {
    return await getInventory();
  },
);

export const fetchTransactions = createAsyncThunk(
  "scrapyard/transactions",
  async () => {
    return await getTransactions();
  },
);

const scrapyardSlice = createSlice({
  name: "scrapyard",
  initialState: {
    orders: [],
    inventory: [],
    transactions: [],
  },

  reducers: {
    socketUpdateOrders: (state, action) => {
      state.orders = action.payload;
    },
    socketUpdateInventory: (state, action) => {
      state.inventory = action.payload;
    },
    socketUpdateTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.inventory = action.payload;
    });

    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const {
  socketUpdateOrders,
  socketUpdateInventory,
  socketUpdateTransactions,
} = scrapyardSlice.actions;

export default scrapyardSlice.reducer;
