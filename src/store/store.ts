
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apislice";
import chatReducer from "./features/chatSlice";
import selectedProspectReducer from "./features/prospectslice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    // Add the RTK Query API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedProspect: selectedProspectReducer,
    cart: cartReducer,
    chat: chatReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the RTK Query middleware

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
