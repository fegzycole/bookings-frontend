import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bookingsReducer } from "./bookings";
import { userReducer } from "./user";

const appReducer = combineReducers({
  bookings: bookingsReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: appReducer,
  middleware: (gdb) =>
    gdb({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
