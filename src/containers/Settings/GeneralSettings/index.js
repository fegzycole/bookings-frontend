import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import FormButton from "../../../components/FormButton";
import FormInput from "../../../components/FormInput";
import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../../../helpers";
import { adminUpdateUser } from "../../../store/user/actions";

const GeneralSettings = ({ userDetails }) => {
  const { email, name } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState({
    email: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
  });

  const [passwords, setPasswords] = useState({
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  useEffect(() => {
    setUser({
      email: {
        value: email,
        error: "",
      },
      name: {
        value: name,
        error: "",
      },
    });
  }, [email, name]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedUser = {
      ...user,
      [name]: {
        value,
        error: "",
      },
    };

    setUser(updatedUser);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    const updatedPasswords = {
      ...passwords,
      [name]: {
        value,
        error: "",
      },
    };

    setPasswords(updatedPasswords);
  };

  const handleSubmit = (password) => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(
      password ? passwords : user
    );

    if (errorExists) {
      password ? setPasswords(updatedFormDetails) : setUser(updatedFormDetails);

      return;
    }

    try {
      adminUpdateUser(
        ...(password
          ? {
              password: passwords.password.value,
              oldEmail: email,
            }
          : {
              email: user.email.value,
              name: user.name.value,
              oldEmail: email,
            })
      );

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "User details saved successfully",
          title: "User Updated",
        })
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error while trying to update user data",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  return (
    <div>
      <div>
        <h3 className="mb-7">Update Details</h3>

        <div className="mb-5">
          <FormInput
            label="Name"
            error={userDetails.name.error}
            value={userDetails.name.value}
            inputId="name"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <FormInput
            label="Email"
            error={userDetails.email.error}
            value={userDetails.email.value}
            inputId="email"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <FormButton value="Update Changes" handleClick={handleSubmit} />
      </div>

      <div className="mt-10">
        <h3 className="mb-7">Change Password</h3>

        <div className="mb-5">
          <FormInput
            label="Password"
            error={userDetails.password.error}
            value={userDetails.password.value}
            inputId="password"
            addborder
            password
            handleInputChange={handlePasswordChange}
          />
        </div>

        <div className="mb-5">
          <FormInput
            label="Confirm Password"
            error={userDetails.confirmPassword.error}
            value={userDetails.confirmPassword.value}
            inputId="confirmPassword"
            addborder
            password
            handleInputChange={handlePasswordChange}
          />
        </div>

        <FormButton
          value="Save Changes"
          handleClick={() => handleSubmit(true)}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
