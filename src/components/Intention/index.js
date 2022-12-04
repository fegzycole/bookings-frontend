import React from "react";
import DatePicker from "../Datepicker";

const Intention = ({
  name,
  massIntention,
  startDate,
  endDate,
  handleChange,
}) => {
  return (
    <div>
      <div>
        <h6>Your Details</h6>
        <div />
      </div>

      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Name *"
        name="bookedByName"
      />

      <textarea
        name="massIntention"
        onChange={handleChange}
        value={massIntention}
        placeholder="Write your prayer request *"
        maxLength={50}
      />

      <p>Select a start and end date for mass intention to be read</p>

      <div>
        <DatePicker value={startDate} />
        <DatePicker value={endDate} />
      </div>
    </div>
  );
};

export default Intention;
