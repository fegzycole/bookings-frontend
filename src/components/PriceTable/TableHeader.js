import React from "react";

const TableHeader = ({ text }) => {
  return (
    <th className="px-4 py-2 border border-customSlate-100 w-[120px] text-lg text-customBlack-200">
      {text}
    </th>
  );
};

export default TableHeader;
