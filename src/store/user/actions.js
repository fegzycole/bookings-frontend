import axios from "axios";
import { setUser } from "./slice";

export const logIn = (userData, signup) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/${signup ? "signup" : "signin"}`,
      {
        ...userData,
      }
    );

    localStorage.setItem("admin-access-token", response.data.data.token);

    dispatch(
      setUser({
        email: response.data.data.email,
        name: response.data.data.name,
      })
    );
  };
};
