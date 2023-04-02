import axios from "axios";
import { setUser } from "./slice";
import { ADMIN_ACCESS_TOKEN} from "../../helpers"

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

    localStorage.setItem(ADMIN_ACCESS_TOKEN, response.data.data.token);

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

export const adminUpdateUser = async (updatedUser, userId) => {
  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

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
  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

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
  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/${userId}/user`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return data;
};
