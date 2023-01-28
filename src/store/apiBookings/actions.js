import axios from "axios";
import { setIntentions } from "./slice";

export const getIntentions = (period) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/bookings${period}`
    );

    const {
      data: { data },
    } = response;
    dispatch(setIntentions(data));
  };
};
