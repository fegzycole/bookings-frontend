import {
  SET_BOOKED_BY,
  ADD_INTENTION,
  EDIT_INTENTION,
  EDIT_BOOKED_BY,
} from "./types";

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
    case EDIT_INTENTION:
      const filteredIntentions = state.intentions.filter(
        (intention) => intention.id !== action.payload.id
      );

      return {
        ...state,
        intentions: [...filteredIntentions, action.payload],
      };
    case EDIT_BOOKED_BY:
      return {
        ...state,
        bookedBy: action.payload,
      };
    default:
      return state;
  }
};

export default bookingsReducer;
