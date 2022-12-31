import { SET_BOOKED_BY, ADD_INTENTION, EDIT_INTENTION, EDIT_BOOKED_BY } from "./types";

export const setBookedBy = (payload) => {
  return {
    type: SET_BOOKED_BY,
    payload,
  };
};

export const addIntention = (payload) => {
  return {
    type: ADD_INTENTION,
    payload,
  };
};

export const editIntention = (payload) => {
  return {
    type: EDIT_INTENTION,
    payload,
  };
};

export const editBookedBy = (payload) => {
  return {
    type: EDIT_BOOKED_BY,
    payload,
  };
};
