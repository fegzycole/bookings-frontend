import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import SignupImage from "../../images/sign_up.png";
import { useLogin } from "../../hooks/useLogin";

const Signup = () => {
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

  const { openLoader, handleSubmit, handleInputChange } = useLogin(
    signupDetails,
    setSignUpDetails,
    true
  );

  return (
    <>
      <Loader open={openLoader} />

      <FormContainer backgroundImage={SignupImage} formText="Sign Up">
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

        <FormButton
          value="Sign Up"
          handleClick={() =>
            handleSubmit({
              name: signupDetails.name.value,
              email: signupDetails.email.value,
              password: signupDetails.password.value,
            })
          }
        />
      </FormContainer>
    </>
  );
};

export default Signup;
