import {
  SET_BOOKED_BY,
  ADD_INTENTION,
  EDIT_INTENTION,
  EDIT_BOOKED_BY,
  RESET_STORE,
  SET_SUCCESS_RESPONSE_DATA,
} from "./types";

const initialState = {
  intentions: [],
  savingChanges: false,
  bookedBy: undefined,
  apiSuccessData: undefined,
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
    case RESET_STORE:
      return {
        ...state,
        ...initialState,
      };
    case SET_SUCCESS_RESPONSE_DATA:
      return {
        ...state,
        apiSuccessData: action.payload,
      };
    default:
      return state;
  }
};

export default bookingsReducer;
