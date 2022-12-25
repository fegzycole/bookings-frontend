import { SET_BOOKED_BY, ADD_INTENTION, EDIT_INTENTION } from "./types";

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
