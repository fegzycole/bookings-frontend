import React from "react";

const DisabledInput = ({ value, smallBox }) => {
  return (
    <input
      disabled
      value={value}
      className={`border-[1px] p-3 w-full mb-5 border-customBlack-700 bg-white rounded-lg ${
        smallBox && "lg:w-[252px]"
      }`}
    />
  );
};

export default DisabledInput;
