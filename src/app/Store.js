import { configureStore } from "@reduxjs/toolkit";

import customerProductReducer from "../features/customer/redux/customerProductSlice";
import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";
import scrapyardReducer from "../features/scrapyard/redux/scrapyardSlice";

export const store = configureStore({
  reducer: {
    scrapRates: scrapRatesReducer,
    scrapyard: scrapyardReducer,
    product: customerProductReducer,
  },
});
