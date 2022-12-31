import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import SectionHeader from "../../components/SectionHeader";
import SummaryItem from "../../components/SummaryItem";
import DisabledInput from "../../components/DisabledInput";
import Input from "../../components/Input";
import InputContainer from "../../components/InputContainer";
import Editable from "../../components/Editable";

const Summary = () => {
  const { intentions } = useSelector((state) => state.bookings);

  const [summaryIntentions, setSummaryIntentions] = useState(intentions);

  const handleInputChange = (id) => (e) => {
    const { name, value } = e.target;

    const foundIndex = summaryIntentions.findIndex(
      (intention) => intention.id === id
    );

    const summaryIntentionsCopy = [...summaryIntentions];

    summaryIntentionsCopy[foundIndex][name] = { value, error: "" };

    setSummaryIntentions(summaryIntentionsCopy);
  };

  const handleDateChange = (id) => (type) => (newDate) => {
    const summaryIntentionsCopy = [...summaryIntentions];

    const foundIndex = summaryIntentionsCopy.findIndex(
      (intention) => intention.id === id
    );

    summaryIntentionsCopy[foundIndex][type] = { value: newDate, error: "" };
    setSummaryIntentions(summaryIntentionsCopy);
  };

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
              <div className="w-full lg:w-[48%]">
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
                {/* 
                <div className="mb-3 pb-3 lg:flex justify-between">
                  <InputContainer error={intention.startDate.error} halfWidth>
                    <Editable>
                      <DatePicker
                        value={intention.startDate.value}
                        handleChange={handleDateChange("startDate")}
                        placeholder="Start Date"
                        minDate={Date.now()}
                      />
                    </Editable>
                  </InputContainer>

                  <InputContainer error={intention.endDate.error} halfWidth>
                    <Editable>
                      <DatePicker
                        value={intention.endDate.value}
                        handleChange={handleDateChange("endDate")}
                        placeholder="End Date"
                        minDate={intention.startDate}
                        disabled={intention.startDate === null}
                      />
                    </Editable>
                  </InputContainer>
                </div>
                <div>
                  <SectionHeader label="Offering" />

                  <DisabledInput value={offering} />
                </div> */}
              </div>
              // <SummaryItem
              //   intention={intention}
              //   key={uuidv4()}
              //   handleInputChange={handleInputChange(intention.id)}
              //   handleDateChange={handleDateChange(intention.id)}
              // />
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
