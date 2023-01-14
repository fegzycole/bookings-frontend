import axios from "axios";

export const userSignUp = async (userData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
    data: userData,
  });

  localStorage.setItem("admin-access-token", response.data.data.accessToken);
};
