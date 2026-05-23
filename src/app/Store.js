import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/customer/redux/cartSlice";
import customerProductReducer from "../features/customer/redux/customerProductSlice";
import scrapRatesReducer from "../features/scrapRates/redux/scrapRatesSlice";
import deliveryReducer from "../features/scrapyard/products/productOrderManage/delivery/redux/deliverySlice";
import scrapyardOrdersReducer from "../features/scrapyard/products/productOrderManage/orders/redux/scrapyardOrdersSlice";
import scrapyardReducer from "../features/scrapyard/redux/scrapyardSlice";
import authReducer from "../redux/actions/authSlice";

import trackingReducer from "../features/scrapyard/products/productOrderManage/delivery/redux/trackingSlice";

export const store = configureStore({
  reducer: {
    scrapRates: scrapRatesReducer,
    scrapyard: scrapyardReducer,

    product: customerProductReducer,
    cart: cartReducer,

    auth: authReducer,
    scrapyardOrders: scrapyardOrdersReducer,

    delivery: deliveryReducer,

    tracking: trackingReducer,
  },
});
