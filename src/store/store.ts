
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apislice";
import chatReducer from "./features/chatSlice";
import ProspectReducer from "./features/prospect";
import cartReducer from "./features/cartSlice";
import CustomerProspectReducer from "./features/customersSlice";
import analyticsReducer from "./features/analytics";
import notificationReducer from "./features/notificationslice";

export const store = configureStore({
  reducer: {
    // Add the RTK Query API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    Prospect: ProspectReducer,
    cart: cartReducer,
    chat: chatReducer,
    customerProspect: CustomerProspectReducer,
    analytics: analyticsReducer,
    notifications: notificationReducer

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the RTK Query middleware

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
