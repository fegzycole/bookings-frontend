import React from "react";
import { useNavigate } from "react-router-dom";

import ReginaPacisLogo from "../../../images/reginapacis.png";
import VectorIcon from "../../../images/leftArrow.svg";

const Header = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={ReginaPacisLogo}
          alt="regina pacis logo"
          className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px]"
        />
        <h6 className="font-Museo ml-3 text-sm lg:text-lg text-customBlack-100">
          Regina Pacis Catholic Church
        </h6>
      </div>

      <button onClick={handleGoBack} className="static z-40">
        <div
          className="flex items-center bg-red w-full h-full"
        >
          <img
            src={VectorIcon}
            alt="left-caret"
            className="w-[6.81px] h-[11.55px] lg:w-[11.67px] lg:h-[16px]"
          />
          <p className="font-Museo ml-3 text-xs lg:text-base text-customBlack-100">
            Go back
          </p>
        </div>
      </button>
    </header>
  );
};

export default Header;
