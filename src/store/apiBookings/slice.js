import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intentions: [],
  fetchingIntentions: false,
  stats: [],
  fetchingStats: [],
  totalAmountPaidForPeriod: undefined,
  totalAmountPaid: undefined,
  totalBookingsForPeriod: undefined,
};

const apiBookingsSlice = createSlice({
  name: "apiBookings",
  initialState,
  reducers: {
    setIntentions(state, action) {
      state.intentions = action.payload;
      state.fetchingIntentions = false;
    },
    setFetchingIntentions(state, action) {
      state.fetchingIntentions = action.payload;
    },
    setFetchingStats(state, action) {
      state.fetchingStats = action.payload;
    },
    setStats(state, action) {
      state.stats = action.payload.bookings;
      state.fetchingIntentions = false;
      state.totalAmountPaid = action.payload.totalAmountPaid;
      state.totalAmountPaidForPeriod = action.payload.totalAmountPaidForPeriod;
      state.totalBookingsForPeriod = action.payload.totalBookingsForPeriod;
    },
  },
});

export const {
  setIntentions,
  setFetchingIntentions,
  setFetchingStats,
  setStats,
} = apiBookingsSlice.actions;

export default apiBookingsSlice.reducer;
