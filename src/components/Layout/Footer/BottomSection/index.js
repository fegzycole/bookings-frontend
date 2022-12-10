import React from "react";
import UpArrow from "../../../../images/upArrow.svg";

const BottomSection = () => {
  return (
    <div className="border-t-[1px] border-customGray-200 pt-5 font-Museo">
      <p className="text-center text-sm text-customBlack-400">
        All rights reserved. © 2022 ReginaPacis.
      </p>

      <div className="hidden">
        <p>Back to Top</p>
        <img src={UpArrow} alt="Back to Top" />
      </div>
    </div>
  );
};

export default BottomSection;
