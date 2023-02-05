import axios from "axios";
import { setIntentions } from "./slice";

export const getIntentions = (period) => {
  return async (dispatch) => {
    const token = localStorage.getItem("admin-access-token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/bookings${period}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    const {
      data: { data },
    } = response;
    dispatch(setIntentions(data));
  };
};
