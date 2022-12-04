import React from "react";
import Input from "../Input";
import SectionHeader from "../SectionHeader";

const BookedBy = ({ bookedByName, handleChange, email, phoneNumber }) => {
  return (
    <div className="mt-10">
      <SectionHeader label="Your Details" />

      <Input
        type="text"
        value={bookedByName}
        handleChange={handleChange}
        placeholder="Name *"
        name="bookedByName"
      />

      <div>
        <Input
          type="email"
          value={email}
          handleChange={handleChange}
          placeholder="Email *"
          name="email"
        />
        <Input
          type="phone"
          value={phoneNumber}
          handleChange={handleChange}
          placeholder="Phone number *"
          name="phoneNumber"
        />
      </div>
    </div>
  );
};

export default BookedBy;
