import React from "react";

import ReginaPacisLogo from "../../../images/reginapacis.png";
import VectorIcon from "../../../images/vector.png";

const Header = () => {
  return (
    <div>
      <div>
        <img src={ReginaPacisLogo} alt="regina pacis logo" />
        <h6>Regina Pacis Catholic Church</h6>
      </div>

      <div>
        <img src={VectorIcon} alt="left-caret" />
        <p>Go back</p>
      </div>
    </div>
  );
};

export default Header;
