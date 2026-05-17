import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload || [];
    },

    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },

    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;
