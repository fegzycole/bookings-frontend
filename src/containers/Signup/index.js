import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import SignupImage from "../../images/sign_up.png";

const Signup = () => {
  const [signupDetails] = useState({
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

  const handleSubmit = () => ({});

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
      />
      <FormInput
        label="Email"
        error={signupDetails.email.error}
        value={signupDetails.email.value}
        inputId="email"
      />
      <FormInput
        label="Password"
        error={signupDetails.password.error}
        value={signupDetails.password.value}
        inputId="password"
        password
      />

      <FormButton value="Sign Up" />

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
