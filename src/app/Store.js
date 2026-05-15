import { configureStore } from "@reduxjs/toolkit";

import companyDashboardReducer from "../features/company/redux/companyDashboardSlice";
import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";

export const store = configureStore({
  reducer: {
    companyDashboard: companyDashboardReducer,
    scrapRates: scrapRatesReducer,
  },
});
