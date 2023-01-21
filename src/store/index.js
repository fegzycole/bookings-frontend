import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bookingsReducer } from "./bookings";
import { userReducer } from "./user";
import { apiBookingsReducer } from "./apiBookings";

const appReducer = combineReducers({
  bookings: bookingsReducer,
  user: userReducer,
  apiBookings: apiBookingsReducer,
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
