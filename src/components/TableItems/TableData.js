import React from "react";

const TableData = ({ text }) => {
  return (
    <td className="px-4 py-2 border border-customSlate-100 text-sm font-light">
      {text}
    </td>
  );
};

export default TableData;
