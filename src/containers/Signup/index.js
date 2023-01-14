import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import {
  validateInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../../helpers";
import SignupImage from "../../images/sign_up.png";
import { userSignUp } from "../../store/user/actions";

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [signupDetails, setSignUpDetails] = useState({
    name: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const previousDetails = {
      ...signupDetails,
      [name]: {
        value,
        error: "",
      },
    };

    setSignUpDetails(previousDetails);
  };

  const handleSubmit = async () => {
    const { errorExists } = validateInputs(signupDetails);

    if (!errorExists) {
      try {
        await userSignUp({
          name: signupDetails.name,
          email: signupDetails.email,
          password: signupDetails.password,
        });

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: "User created successfully",
            title: "Success",
          })
        );
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message: "Unable to create user, please try again",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  return (
    <FormContainer
      backgroundImage={SignupImage}
      handleSubmit={handleSubmit}
      formText="Sign Up"
    >
      <FormInput
        label="Name"
        error={signupDetails.name.error}
        value={signupDetails.name.value}
        inputId="name"
        handleInputChange={handleInputChange}
      />
      <FormInput
        label="Email"
        error={signupDetails.email.error}
        value={signupDetails.email.value}
        inputId="email"
        handleInputChange={handleInputChange}
      />
      <FormInput
        label="Password"
        error={signupDetails.password.error}
        value={signupDetails.password.value}
        inputId="password"
        password
        handleInputChange={handleInputChange}
      />

      <FormButton value="Sign Up" onClick={handleSubmit} />

      <h6 className="text-center text-base font-Museo text-customBlack-200">
        Already have an account?{" "}
        <Link to={"/signin"} className="text-customGreen-100">
          Sign In
        </Link>
      </h6>
    </FormContainer>
  );
};

export default Signup;
