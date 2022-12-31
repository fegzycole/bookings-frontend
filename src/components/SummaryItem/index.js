import React from "react";
import converter from "number-to-words";
import SectionHeader from "../SectionHeader";
import DisabledInput from "../DisabledInput";
import Input from "../Input";
import InputContainer from "../InputContainer";
import Editable from "../Editable";
import DatePicker from "../Datepicker";
import { getOffering } from "../../helpers";

const Item = ({ intention, handleInputChange, handleDateChange, index }) => {
  const offering = getOffering(
    intention.startDate.value,
    intention.endDate.value
  );
  return (
    <div className="w-full lg:w-[48%]">
      <h6 className="my-4 capitalize">{converter.toWordsOrdinal(index + 1)} Intention</h6>
      <InputContainer error={intention.name.error}>
        <Editable>
          <Input
            name="name"
            type="text"
            placeholder="Name*"
            value={intention.name.value}
            handleChange={handleInputChange(intention.id)}
          />
        </Editable>
      </InputContainer>

      <InputContainer error={intention.massIntention.error}>
        <Editable textArea>
          <textarea
            name="massIntention"
            onChange={handleInputChange(intention.id)}
            value={intention.massIntention.value}
            placeholder="Write your prayer request *"
            maxLength={500}
            className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-xs rounded-lg h-[183px]"
          />
        </Editable>
      </InputContainer>

      <div className="mb-3 pb-3 lg:flex justify-between">
        <InputContainer error={intention.startDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={intention.startDate.value}
              handleChange={handleDateChange(intention.id)("startDate")}
              placeholder="Start Date"
              minDate={Date.now()}
            />
          </Editable>
        </InputContainer>

        <InputContainer error={intention.endDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={intention.endDate.value}
              handleChange={handleDateChange(intention.id)("endDate")}
              placeholder="End Date"
              minDate={intention.startDate}
              disabled={intention.startDate === null}
            />
          </Editable>
        </InputContainer>
      </div>
      <div>
        <SectionHeader label="Price" />

        <DisabledInput value={`₦ ${offering}`} />
      </div>
    </div>
  );
};

export default Item;
