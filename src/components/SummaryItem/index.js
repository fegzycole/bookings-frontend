import React from "react";
import useBooking from "../../hooks/useBooking";
import ButtonSection from "../ButtonSection";
import DatePicker from "../Datepicker";
import DisabledInput from "../DisabledInput";
import Editable from "../Editable";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";

const SummaryItem = ({ intention }) => {
  const {
    handleInputChange,
    handleDateChange,
    booking,
    handleSave,
    handleCancel,
  } = useBooking({ initialBooking: false, existingBooking: intention });

  console.log({ booking, intention });

  const { name, massIntention, startDate, endDate } = booking;

  return (
    <div className="w-full lg:w-[48%]">
      <InputContainer error={name.error}>
        <Editable>
          <Input
            name="name"
            type="text"
            placeholder="Name*"
            value={name.value}
            handleChange={handleInputChange}
          />
        </Editable>
      </InputContainer>

      <InputContainer error={massIntention.error}>
        <Editable textArea>
          <textarea
            name="massIntention"
            onChange={handleInputChange}
            value={massIntention.value}
            placeholder="Write your prayer request *"
            maxLength={500}
            className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-xs rounded-lg h-[183px]"
          />
        </Editable>
      </InputContainer>

      <div className="mb-3 pb-3 lg:flex justify-between">
        <InputContainer error={startDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={startDate.value}
              handleChange={handleDateChange("startDate")}
              placeholder="Start Date"
              minDate={Date.now()}
            />
          </Editable>
        </InputContainer>

        <InputContainer error={endDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={endDate.value}
              handleChange={handleDateChange("endDate")}
              placeholder="End Date"
              minDate={startDate}
              disabled={startDate === null}
            />
          </Editable>
        </InputContainer>
      </div>

      <div>
        <ButtonSection handleSave={handleSave} handleCancel={handleCancel} />
      </div>

      <div>
        <SectionHeader label="Offering" />

        <DisabledInput />
      </div>
    </div>
  );
};

export default SummaryItem;
