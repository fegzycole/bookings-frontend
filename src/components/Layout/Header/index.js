import React from "react";

import ReginaPacisLogo from "../../../images/reginapacis.png";
import VectorIcon from "../../../images/vector.svg";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <img src={ReginaPacisLogo} alt="regina pacis logo" />
        <h6 className="font-Museo ml-3 text-2xl">Regina Pacis Catholic Church</h6>
      </div>

      <div className="flex items-center">
        <img src={VectorIcon} alt="left-caret" />
        <p className="font-Museo ml-3 text-lg">Go back</p>
      </div>
    </div>
  );
};

export default Header;
