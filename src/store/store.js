import { configureStore } from "@reduxjs/toolkit";
import { authSlice, uiSlice } from "./";

export const store = configureStore({
  reducer: {
    // calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
