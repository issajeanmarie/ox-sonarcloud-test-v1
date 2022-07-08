import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/api";
import authReducer from "./slices/authSlice";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com>
 * @since July 2022
 */

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
