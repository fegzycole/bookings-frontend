import React from "react";
import UpArrow from "../../../../images/upArrow.svg";

const BottomSection = () => {
  return (
    <div className="border-t-[1px] border-customGray-200">
      <div className="py-5 font-Museo lg:flex lg:justify-between lg:items-center lg:w-[90%] lg:mx-auto">
        <p className="text-center lg:text-left text-sm text-customBlack-400">
          All rights reserved. © 2022 ReginaPacis.
        </p>

        <div className="hidden lg:flex items-center">
          <p className="text-base text-customBlack-400 mr-5">Back to Top</p>
          <img src={UpArrow} alt="Back to Top" />
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
