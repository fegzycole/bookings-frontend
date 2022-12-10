import React from "react";

import Line from "../Line";

const SectionHeader = ({ label }) => {
  return (
    <div className="flex mb-5 items-center">
      <h6 className="uppercase text-sm text-customBlack-200">{label}</h6>
      <Line />
    </div>
  );
};

export default SectionHeader;
