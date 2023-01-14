import axios from "axios";

export const userSignUp = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/signup`,
    {
      ...userData,
    }
  );

  console.log({ response: response.data.data });

  localStorage.setItem("admin-access-token", response.data.data.token);
};
