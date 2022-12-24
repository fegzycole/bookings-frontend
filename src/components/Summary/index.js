import React from "react";
import Input from "../Input";
import InputContainer from "../InputContainer";

const Summary = ({ name, handleChange, massIntention }) => {
  return (
    <div>
      <InputContainer error={name.error}>
        <Input
          name="name"
          type="text"
          placeholder="Name*"
          value={name.value}
          handleChange={handleChange}
        />
      </InputContainer>

      <InputContainer error={massIntention.error}>
        <textarea
          name="massIntention"
          onChange={handleChange}
          value={massIntention.value}
          placeholder="Write your prayer request *"
          maxLength={500}
          className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-xs rounded-lg h-[183px]"
        />
      </InputContainer>
    </div>
  );
};

export default Summary;
