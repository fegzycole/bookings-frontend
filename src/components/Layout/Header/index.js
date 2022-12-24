import React from "react";

import ReginaPacisLogo from "../../../images/reginapacis.png";
import VectorIcon from "../../../images/rightArrow.svg";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <img src={ReginaPacisLogo} alt="regina pacis logo" className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px]" />
        <h6 className="font-Museo ml-3 text-sm lg:text-2xl text-customBlack-100">Regina Pacis Catholic Church</h6>
      </div>

      <div className="flex items-center">
        <img src={VectorIcon} alt="left-caret" className="w-[6.81px] h-[11.55px] lg:w-[11.67px] lg:h-[19.8px]" />
        <p className="font-Museo ml-3 text-xs lg:text-lg text-customBlack-100">Go back</p>
      </div>
    </div>
  );
};

export default Header;
