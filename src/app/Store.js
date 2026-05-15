// import { createStore, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import reducers from "./reducers/CombineAllReducers";

import { configureStore } from "@reduxjs/toolkit";
import companyDashboardReducer from "../features/company/redux/companyDashboardSlice";

// export const store = createStore(reducers, applyMiddleware(thunk));

// import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    companyDashboard: companyDashboardReducer,
  },
});
