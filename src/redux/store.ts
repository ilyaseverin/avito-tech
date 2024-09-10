import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { advertisementsApi } from "./advertisementsApi";
import { ordersApi } from "./ordersApi";

export const store = configureStore({
  reducer: {
    [advertisementsApi.reducerPath]: advertisementsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      advertisementsApi.middleware,
      ordersApi.middleware
    ),
});

setupListeners(store.dispatch);
