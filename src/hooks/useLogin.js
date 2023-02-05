import { useState } from "react";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../helpers/index";
import {
  logIn,
  setPasswordResetEmail,
  resetPassword,
} from "../store/user/actions";

export const useLogin = (formDetails, setFormDetails, isSignup) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const { name } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();

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
        navigate("/admin/massBookings");
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

  const handleSetPasswordResetEmail = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(formDetails);

    if (errorExists) {
      setFormDetails(updatedFormDetails);
    } else {
      try {
        setOpenLoader(true);

        await setPasswordResetEmail(formDetails.email.value);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Mail Sent Successfully, please check your inbox`,
            title: "Success",
          })
        );

        setFormDetails({
          email: {
            value: "",
            error: "",
          },
        });
        setOpenLoader(false);
      } catch (error) {
        setOpenLoader(false);
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "An Error occurred while fetching sending password reset email",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  const handleResetPassword = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(formDetails);
    if (errorExists) {
      setFormDetails(updatedFormDetails);
    } else {
      try {
        const email = searchParams.get("email");
        setOpenLoader(true);

        await resetPassword(email, formDetails.password.value);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Password Reset Successfully`,
            title: "Success",
          })
        );

        setFormDetails({
          password: {
            value: "",
            error: "",
          },
          confirmPassword: {
            value: "",
            error: "",
          },
        });

        setOpenLoader(false);
      } catch (error) {
        setOpenLoader(false);
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message: "An Error occurred while resetting the password",
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
    handleSetPasswordResetEmail,
    handleResetPassword,
  };
};
