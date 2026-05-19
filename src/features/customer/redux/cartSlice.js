import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        existingItem.qty += product.qty || 1;
      } else {
        state.items.push({
          ...product,
          qty: product.qty || 1,
        });
      }

      state.isCartOpen = true;
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);

      if (item) {
        item.qty += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
