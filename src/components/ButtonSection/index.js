import React from "react";
import RightArrow from "../../images/rightArrow.svg";

const ButtonSection = ({ handleCancel, handleSave }) => {
  return (
    <div>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>
        <p>Save</p>
        <img src={RightArrow} alt="right-arrow" />
      </button>
    </div>
  );
};

export default ButtonSection;
