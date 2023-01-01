import React from "react";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";
import Editable from "../Editable";

const BookedBy = ({ bookedByName, handleChange, email, phoneNumber, mode }) => {
  const getWrapper = (children) => {
    if (mode === "create") {
      return <>{children}</>;
    }

    return <Editable>{children}</Editable>;
  };

  return (
    <div className="mt-10">
      <SectionHeader label="YOUR DETAILS" />

      <p className="font-Museo text-xs text-customBlack-200 mb-5">
        Details of the person booking
      </p>

      <InputContainer error={bookedByName.error}>
        {getWrapper(
          <Input
            type="text"
            value={bookedByName.value}
            handleChange={handleChange}
            placeholder="Name *"
            name="bookedByName"
          />
        )}
      </InputContainer>

      <div className="lg:flex justify-between">
        <InputContainer error={email.error} halfWidth>
          {getWrapper(
            <Input
              type="email"
              value={email.value}
              handleChange={handleChange}
              placeholder="Email *"
              name="email"
            />
          )}
        </InputContainer>

        <InputContainer error={phoneNumber.error} halfWidth>
          {getWrapper(
            <Input
              type="text"
              value={phoneNumber.value}
              handleChange={handleChange}
              placeholder="Phone number *"
              name="phoneNumber"
            />
          )}
        </InputContainer>
      </div>
    </div>
  );
};

export default BookedBy;
