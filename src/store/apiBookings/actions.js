import axios from "axios";
import { setIntentions } from "./slice";

export const getIntentions = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/bookings`
    );

    const {
      data: { data },
    } = response;
    dispatch(setIntentions(data));
  };
};
