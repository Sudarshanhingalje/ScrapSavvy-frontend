import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/customer/redux/cartSlice";
import customerProductReducer from "../features/customer/redux/customerProductSlice";
import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";
import scrapyardReducer from "../features/scrapyard/redux/scrapyardSlice";
import authReducer from "../redux/actions/authSlice";
export const store = configureStore({
  reducer: {
    scrapRates: scrapRatesReducer,
    scrapyard: scrapyardReducer,

    product: customerProductReducer,
    cart: cartReducer,

    auth: authReducer,
  },
});
