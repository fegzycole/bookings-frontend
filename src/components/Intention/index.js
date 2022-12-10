import React from "react";

import DatePicker from "../Datepicker";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";

const Intention = ({
  name,
  massIntention,
  startDate,
  endDate,
  handleChange,
  handleDateChange,
}) => {
  return (
    <div className="mt-5">
      <SectionHeader label="Intention For" />

      <InputContainer error={name.error}>
        <Input
          type="text"
          value={name.value}
          handleChange={handleChange}
          placeholder="Name *"
          name="name"
        />
      </InputContainer>

      <InputContainer error={massIntention.error}>
        <textarea
          name="massIntention"
          onChange={handleChange}
          value={massIntention.value}
          placeholder="Write your prayer request *"
          maxLength={500}
          className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-xs rounded-lg h-[183px]"
        />
      </InputContainer>

      <p className="text-xs text-customBlack-200 py-6">
        Select a start and end date for mass intention to be read
      </p>

      <div className="mb-3 pb-3">
        <InputContainer error={startDate.error}>
          <DatePicker
            value={startDate.value}
            handleChange={handleDateChange("startDate")}
            placeholder="Start Date"
          />
        </InputContainer>

        <InputContainer error={endDate.error}>
          <DatePicker
            value={endDate.value}
            handleChange={handleDateChange("endDate")}
            placeholder="End Date"
            minDate={startDate}
            disabled={startDate === null}
          />
        </InputContainer>
      </div>
    </div>
  );
};

export default Intention;
