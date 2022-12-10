import React from "react";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";

const BookedBy = ({ bookedByName, handleChange, email, phoneNumber }) => {
  return (
    <div className="mt-10">
      <SectionHeader label="Your Details" />

      <InputContainer error={bookedByName.error}>
        <Input
          type="text"
          value={bookedByName.value}
          handleChange={handleChange}
          placeholder="Name *"
          name="bookedByName"
        />
      </InputContainer>

      <div className="lg:flex justify-between">
        <InputContainer error={email.error} halfWidth>
          <Input
            type="email"
            value={email.value}
            handleChange={handleChange}
            placeholder="Email *"
            name="email"
          />
        </InputContainer>

        <InputContainer error={phoneNumber.error} halfWidth>
          <Input
            type="tel"
            value={phoneNumber.value}
            handleChange={handleChange}
            placeholder="Phone number *"
            name="phoneNumber"
          />
        </InputContainer>
      </div>
    </div>
  );
};

export default BookedBy;
