import React from "react";
import ReginaPacisLogo from "../../images/reginapacis.png";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh] py-7 px-4">
      <header>
        <a href="https://reginapaciscc.org/">
          <div className="flex flex-col w-[300px] text-center">
            <img
              src={ReginaPacisLogo}
              alt="regina pacis logo"
              className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px] mx-auto"
            />
            <h6 className="font-Museo ml-1 text-base lg:text-lg text-customBlack-100">
              Regina Pacis Catholic Church
            </h6>
          </div>
        </a>
      </header>

      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
