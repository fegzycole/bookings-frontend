import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intentions: [],
  savingChanges: false,
  bookedBy: undefined,
  apiSuccessData: undefined,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookedBy(state, action) {
      state.bookedBy = action.payload;
    },
    addIntention(state, action) {
      state.intentions.push(action.payload);
    },
    editIntention(state, action) {
      state.intentions = state.intentions.filter(
        (intention) => intention.id !== action.payload.id
      );
      state.intentions.push(action.payload);
    },
    editBookedBy(state, action) {
      state.bookedBy = action.payload;
    },
    resetStore(state) {
      state.intentions = [];
      state.savingChanges = false;
      state.bookedBy = undefined;
      state.apiSuccessData = undefined;
    },
    setSuccessResponseData(state, action) {
      state.apiSuccessData = action.payload;
    },
    deleteIntention(state, action) {
      state.intentions = state.intentions.filter(
        (intention) => intention.id !== action.payload.id
      );
    },
  },
});

export const {
  setBookedBy,
  addIntention,
  editIntention,
  editBookedBy,
  resetStore,
  setSuccessResponseData,
  deleteIntention,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
