import { configureStore } from "@reduxjs/toolkit";
import { authSlice, restaurantSilce, uiSlice } from "./";

export const store = configureStore({
  reducer: {
    // calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    restaurant: restaurantSilce.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
