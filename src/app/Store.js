import { configureStore } from "@reduxjs/toolkit";

import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";

export const store = configureStore({
  reducer: {
    // companyDashboard: companyDashboardReducer,
    scrapRates: scrapRatesReducer,
  },
});
