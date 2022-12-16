import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../api/api";
import authReducer from "./slices/authSlice";
import trucksReducer from "./slices/trucksSlice";
import depotsReducer from "./slices/depotsSlice";
import paginatedDataReducer from "./slices/paginatedData";

/**
 * @author Kundwa Bruno M <kundwabruno@gmail.com>
 * @since July 2022
 */

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    trucks: trucksReducer,
    depots: depotsReducer,
    paginatedData: paginatedDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
