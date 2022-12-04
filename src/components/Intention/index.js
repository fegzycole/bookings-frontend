import React from "react";

import DatePicker from "../Datepicker";
import Input from "../Input";
import SectionHeader from "../SectionHeader";

const Intention = ({
  name,
  massIntention,
  startDate,
  endDate,
  handleChange,
}) => {
  return (
    <div className="mt-10">
      <SectionHeader label="Intention For" />

      <Input
        type="text"
        value={name}
        handleChange={handleChange}
        placeholder="Name *"
        name="bookedByName"
      />

      <textarea
        name="massIntention"
        onChange={handleChange}
        value={massIntention}
        placeholder="Write your prayer request *"
        maxLength={500}
        className="p-3 border-solid border border-customBlack-300 mb-8 w-full text-customGray-100 placeholder-customGray-100 text-xs rounded-lg h-[183px]"
      />

      <p className="text-xs text-customBlack-200 mb-8">
        Select a start and end date for mass intention to be read
      </p>

      <div className="mb-3 pb-3">
        <div className="mb-8">
          <DatePicker
            value={startDate}
            handleChange={handleChange}
            placeholder="Start Date"
          />
        </div>

        <div className="mb-8">
          <DatePicker
            value={endDate}
            handleChange={handleChange}
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
  );
};

export default Intention;
