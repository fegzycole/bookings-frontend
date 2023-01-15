import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import ForgotPasswordImage from "../../images/forgot_password.png";
import { useLogin } from "../../hooks/useLogin";
import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
    email: {
      value: "",
      error: "",
    },
  });

  const { handleInputChange, handleSetPasswordResetEmail, openLoader } =
    useLogin(forgotPasswordDetails, setForgotPasswordDetails);

  return (
    <>
      <Loader open={openLoader} />
      <FormContainer
        backgroundImage={ForgotPasswordImage}
        formText="Forgot Password?"
      >
        <FormInput
          label="Email"
          error={forgotPasswordDetails.email.error}
          value={forgotPasswordDetails.email.value}
          inputId="email"
          handleInputChange={handleInputChange}
        />

        <FormButton
          value="Send Password Reset Email"
          handleClick={handleSetPasswordResetEmail}
        />
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
