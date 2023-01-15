import { useState } from "react";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../helpers/index";
import { logIn } from "../store/user/actions";

export const useLogin = (formDetails, setFormDetails, isSignup) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const { name } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const previousDetails = {
      ...formDetails,
      [name]: {
        value,
        error: "",
      },
    };

    setFormDetails(previousDetails);
  };

  const handleSubmit = async (itemsToSend) => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(formDetails);

    const errMessage = `Unable to ${
      isSignup ? "Sign up" : "Log in"
    } user, please try again`;

    if (errorExists) {
      setFormDetails(updatedFormDetails);
    } else {
      try {
        setOpenLoader(true);

        await dispatch(logIn(itemsToSend, isSignup));

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Welcome ${name}`,
            title: "Success",
          })
        );

        setOpenLoader(false);
        navigate("/dashboard");
      } catch (error) {
        setOpenLoader(false);
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message: errMessage,
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  return {
    handleSubmit,
    openLoader,
    handleInputChange,
  };
};
