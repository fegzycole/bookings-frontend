import React from "react";
import UpArrow from "../../../../images/upArrow.svg";

const BottomSection = () => {
  return (
    <div>
      <p>All rights reserved. © 2022 ReginaPacis.</p>

      <div>
        <p>Back to Top</p>
        <img src={UpArrow} alt="Back to Top" />
      </div>
    </div>
  );
};

export default BottomSection;
