import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import SignInImage from "../../images/sign_in.png";
import { useLogin } from "../../hooks/useLogin";

const SignIn = () => {
  const [signInDetails, setSignInDetails] = useState({
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
    signInDetails,
    setSignInDetails,
    false
  );

  return (
    <>
      <Loader open={openLoader} />

      <FormContainer backgroundImage={SignInImage} formText="Sign In">
        <FormInput
          label="Email"
          error={signInDetails.email.error}
          value={signInDetails.email.value}
          inputId="email"
          handleInputChange={handleInputChange}
        />
        <FormInput
          label="Password"
          error={signInDetails.password.error}
          value={signInDetails.password.value}
          inputId="password"
          password
          handleInputChange={handleInputChange}
        />

        <FormButton
          value="Sign In"
          handleClick={() =>
            handleSubmit({
              email: signInDetails.email.value,
              password: signInDetails.password.value,
            })
          }
        />
      </FormContainer>
    </>
  );
};

export default SignIn;
