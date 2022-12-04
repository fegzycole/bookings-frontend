import React from "react";

const Input = ({ type, value, handleChange, placeholder, name }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      name={name}
      className="p-3 border-solid border-b border-customBlack-300 mb-8 w-full text-customGray-100 placeholder-customGray-100 text-sm"
    />
  );
};

export default Input;
