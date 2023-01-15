import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import ForgotPasswordImage from "../../images/forgot_password.png";
import { useLogin } from "../../hooks/useLogin";
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const { handleResetPassword, handleInputChange, openLoader } = useLogin(
    resetPasswordDetails,
    setResetPasswordDetails
  );

  return (
    <>
      <Loader open={openLoader} />
      <FormContainer
        backgroundImage={ForgotPasswordImage}
        formText="Reset Password"
      >
        <FormInput
          label="Password"
          error={resetPasswordDetails.password.error}
          value={resetPasswordDetails.password.value}
          inputId="password"
          handleInputChange={handleInputChange}
          password
        />
        <FormInput
          label="Confirm Password"
          error={resetPasswordDetails.confirmPassword.error}
          value={resetPasswordDetails.confirmPassword.value}
          inputId="confirmPassword"
          handleInputChange={handleInputChange}
          password
        />

        <FormButton value="Reset Password" handleClick={handleResetPassword} />
      </FormContainer>
    </>
  );
};

export default ResetPassword;
