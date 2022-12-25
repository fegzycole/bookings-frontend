import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import SectionHeader from "../../components/SectionHeader";
import SummaryItem from "../../components/SummaryItem";
import DisabledInput from "../../components/DisabledInput";

const Summary = () => {
  const { intentions } = useSelector((state) => state.bookings);

  return (
    <div className="mt-4">
      {intentions.length > 0 ? (
        <>
          <SectionHeader label="SUMMARY" />

          <div className="mt-3">
            <SectionHeader label="Masses Booked" greyLine />
          </div>

          <div className="mt-3">
            <DisabledInput value={intentions.length} smallBox />
          </div>

          <div className="flex flex-wrap justify-between">
            {intentions.map((intention) => (
              <SummaryItem intention={intention} key={uuidv4()} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Summary;
