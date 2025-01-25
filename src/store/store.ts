
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apislice";

export const store = configureStore({
  reducer: {
    // Add the RTK Query API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
