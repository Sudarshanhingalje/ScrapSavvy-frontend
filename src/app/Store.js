import { configureStore } from "@reduxjs/toolkit";

import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";

import scrapyardReducer from "../features/scrapyard/redux/scrapyardSlice";

import productReducer from "../features/scrapyard/redux/productSlice";

export const store = configureStore({
  reducer: {
    scrapRates: scrapRatesReducer,

    scrapyard: scrapyardReducer,

    product: productReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
