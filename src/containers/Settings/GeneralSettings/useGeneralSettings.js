import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import jwt from "jwt-decode";
import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
  ADMIN_ACCESS_TOKEN,
} from "../../../helpers";
import { adminGetUser, adminUpdateUser } from "../../../store/user/actions";

const initialPasswords = {
  password: {
    value: "",
    error: "",
  },
  confirmPassword: {
    value: "",
    error: "",
  },
};

export const useGeneralSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openLoader, setOpenLoader] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const [user, setUser] = useState({
    email: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
  });

  const [passwords, setPasswords] = useState(initialPasswords);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
    const user = jwt(token);

    try {
      setOpenLoader(true);

      const userData = await adminGetUser(user.id);

      setUser({
        email: {
          value: userData.data.data.email,
          error: "",
        },
        name: {
          value: userData.data.data.name,
          error: "",
        },
      });

      setUserId(userData.data.data.id);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to fetch user",
          title: "User",
        })
      );
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedUser = {
      ...user,
      [name]: {
        value,
        error: "",
      },
    };

    setUser(updatedUser);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    const updatedPasswords = {
      ...passwords,
      [name]: {
        value,
        error: "",
      },
    };

    setPasswords(updatedPasswords);
  };

  const handleSubmit = async (password) => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(
      password ? passwords : user
    );

    if (errorExists) {
      password ? setPasswords(updatedFormDetails) : setUser(updatedFormDetails);

      return;
    }

    try {
      setOpenLoader(true);
      await adminUpdateUser(
        password
          ? {
              password: passwords.password.value,
            }
          : {
              email: user.email.value,
              name: user.name.value,
            },
        userId
      );

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "User details saved successfully",
          title: "User Updated",
        })
      );

      setOpenLoader(false);

      if (password) {
        setPasswords(initialPasswords);
      }
    } catch (error) {
      setOpenLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error while trying to update user data",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  return {
    openLoader,
    user,
    handleChange,
    handleSubmit,
    passwords,
    handlePasswordChange,
  };
};
