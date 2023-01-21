import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intentions: [],
  fetchingIntentions: false,
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
  },
});

export const { setIntentions, setFetchingIntentions } =
  apiBookingsSlice.actions;

export default apiBookingsSlice.reducer;
