import React from "react";

const BookedBy = ({ bookedByName, handleChange, email, phoneNumber }) => {
  return (
    <div>
      <div>
        <h6>Your Details</h6>
        <div />
      </div>

      <input
        type="text"
        value={bookedByName}
        onChange={handleChange}
        placeholder="Name *"
        name="bookedByName"
      />

      <div>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email *"
          name="email"
        />
        <input
          type="phone"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="Phone number *"
          name="phoneNumber"
        />
      </div>
    </div>
  );
};

export default BookedBy;
