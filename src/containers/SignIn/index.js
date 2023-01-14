import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import SignInImage from "../../images/sign_in.png";

const SignIn = () => {
  const [signInDetails] = useState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const handleSubmit = () => ({});

  return (
    <FormContainer
      backgroundImage={SignInImage}
      handleSubmit={handleSubmit}
      formText="Sign In"
    >
      <FormInput
        label="Email"
        error={signInDetails.email.error}
        value={signInDetails.email.value}
        inputId="email"
      />
      <FormInput
        label="Password"
        error={signInDetails.password.error}
        value={signInDetails.password.value}
        inputId="password"
        password
      />

      <FormButton value="Sign In" />

      <h6 className="text-center text-base font-Museo text-customBlack-200">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-customGreen-100">
          Sign Up
        </Link>
      </h6>
    </FormContainer>
  );
};

export default SignIn;
