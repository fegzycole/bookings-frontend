import React from "react";
import { v4 as uuidv4 } from "uuid";
import TableHeader from "../TableItems/TableHeader";
import TableData from "../TableItems/TableData";
import { formatTime } from "../../helpers";

const headerColumns = [
  "NAME",
  "INTENTION FOR",
  "START DATE",
  "END DATE",
  "AMOUNT",
];

const IntentionsTable = ({ intentions }) => {
  return (
    <table className="mt-4 text-left rounded-lg w-full">
      <thead>
        <tr>
          {headerColumns.map((columnName) => (
            <TableHeader text={columnName} key={columnName} />
          ))}
        </tr>
      </thead>

      <tbody className="rounded-lg">
        {intentions.map(
          ({ bookedBy, name, startDate, endDate, amountPaid }) => (
            <tr key={`${uuidv4()}`} className="rounded-lg">
              <TableData text={bookedBy} />
              <TableData text={name} />
              <TableData text={formatTime(startDate)} />
              <TableData text={formatTime(endDate)} />
              <TableData text={`₦ ${amountPaid}`} />
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default IntentionsTable;
