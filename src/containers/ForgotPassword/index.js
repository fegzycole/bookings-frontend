import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import ForgotPasswordImage from "../../images/forgot_password.png";

const ForgotPassword = () => {
  const [forgotPasswordDetails] = useState({
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const handleSubmit = () => ({});

  return (
    <FormContainer
      backgroundImage={ForgotPasswordImage}
      handleSubmit={handleSubmit}
      formText="Reset Password"
    >
      <FormInput
        label="Password"
        error={forgotPasswordDetails.password.error}
        value={forgotPasswordDetails.password.value}
        inputId="password"
        password
      />
      <FormInput
        label="Confirm Password"
        error={forgotPasswordDetails.confirmPassword.error}
        value={forgotPasswordDetails.confirmPassword.value}
        inputId="confirmPassword"
        password
      />

      <FormButton value="Reset Password" />

      <h6 className="text-center text-base font-Museo text-customBlack-200">
        Didn't get Password?
      </h6>
    </FormContainer>
  );
};

export default ForgotPassword;
