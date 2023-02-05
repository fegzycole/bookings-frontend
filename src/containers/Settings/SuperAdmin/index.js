import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FormButton from "../../../components/FormButton";
import FormInput from "../../../components/FormInput";
import Loader from "../../../components/Loader";
import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../../../helpers";
import { adminCreateUser } from "../../../store/user/actions";

const SuperAdmin = () => {
  const [info, setInfo] = useState({
    email: {
      value: "",
      error: "",
    },
  });
  const [openLoader, setOpenLoader] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedInfo = {
      ...info,
      [name]: {
        value,
        error: "",
      },
    };

    setInfo(updatedInfo);
  };

  const handleSubmit = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(info);

    if (errorExists) {
      setInfo(updatedFormDetails);

      return;
    }

    try {
      setOpenLoader(true);
      await adminCreateUser(info.email.value);

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "User created successfully and email invitation sent",
          title: "User Updated",
        })
      );
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error while creating admin",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  return (
    <div>
      <Loader open={openLoader} />
      <div>
        <h3 className="mb-7">Send invite to a sub-admin</h3>

        <div className="mb-5">
          <FormInput
            label="Email"
            error={info.email.error}
            value={info.email.value}
            inputId="email"
            addborder
            handleInputChange={handleChange}
          />
        </div>

        <FormButton value="Send Invite" handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SuperAdmin;
