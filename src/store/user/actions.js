import axios from "axios";
import { setUser } from "./slice";

export const logIn = (userData, signup) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/${
        signup ? "admin/signup" : "users/signin"
      }`,
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

export const setPasswordResetEmail = async (email) => {
  await axios.get(
    `${process.env.REACT_APP_API_URL}/users/sendPasswordResetEmail/${email}`
  );
};

export const resetPassword = async (email, password) => {
  await axios.patch(
    `${process.env.REACT_APP_API_URL}/users/resetPassword/${email}`,
    {
      password,
    }
  );
};

export const adminUpdateUser = async (updatedUser) => {
  const token = localStorage.getItem("admin-access-token");

  await axios.post(
    `${process.env.REACT_APP_API_URL}/admin/createUser`,
    {
      ...updatedUser,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export const adminCreateUser = async (email) => {
  const token = localStorage.getItem("admin-access-token");

  await axios.post(
    `${process.env.REACT_APP_API_URL}/admin/createUser`,
    {
      email,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};
