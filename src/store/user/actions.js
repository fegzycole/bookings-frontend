import axios from "axios";
import { setUser, resetUser } from "./slice";

export const logIn = (userData, signup) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/${
        signup ? "admin/signup" : "admin/signin"
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

export const logoutUser = async () => {
  return async (dispatch) => {
    dispatch(resetUser());
  };
};

export const adminUpdateUser = async (updatedUser, userId) => {
  const token = localStorage.getItem("admin-access-token");

  await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/updateUser/${userId}`,
    {
      ...updatedUser,
    },
    {
      headers: {
        token,
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
        token,
      },
    }
  );
};

export const adminGetUser = async (userId) => {
  const token = localStorage.getItem("admin-access-token");

  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/${userId}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return data;
};
