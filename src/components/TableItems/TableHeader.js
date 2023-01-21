import React from "react";

const TableHeader = ({ text, border }) => {
  const textColor = border ? "text-customBlack-200" : "text-customBlack-800";
  const borderColor = border && "border border-customSlate-100";
  const fontWeight = !border && "font-medium";

  return (
    <th
      className={`px-4 py-2 ${borderColor} w-[120px] text-lg ${textColor} font-Satoshi ${fontWeight}`}
    >
      {text}
    </th>
  );
};

export default TableHeader;
