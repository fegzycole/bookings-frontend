import {
  SET_BOOKED_BY,
  ADD_INTENTION,
  EDIT_INTENTION,
  EDIT_BOOKED_BY,
  RESET_STORE,
  SET_SUCCESS_RESPONSE_DATA,
  DELETE_INTENTION,
} from "./types";

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

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const setSuccessResponseData = (payload) => {
  return {
    type: SET_SUCCESS_RESPONSE_DATA,
    payload,
  };
};

export const deleteIntention = (payload) => {
  return {
    type: DELETE_INTENTION,
    payload,
  };
};
