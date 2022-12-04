import { SET_BOOKED_BY, ADD_INTENTION } from "./types";

const initialState = {
  intentions: [],
  savingChanges: false,
  bookedBy: undefined,
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKED_BY:
      return {
        ...state,
        bookedBy: action.payload,
      };
    case ADD_INTENTION:
      return {
        ...state,
        intentions: [...state.intentions, action.payload],
      };
    default:
      return state;
  }
};

export default bookingsReducer;
