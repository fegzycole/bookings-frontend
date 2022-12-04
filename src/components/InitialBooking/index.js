import React, { useState } from "react";
import { useDispatch } from "react-redux";

import BookedBy from "../BookedBy";
import ButtonSection from "../ButtonSection";
import Intention from "../Intention";
import { addIntention, setBookedBy } from "../../store/bookings/actions";
import { BOOKING } from "../../helpers";

const InitialBooking = () => {
  const dispatch = useDispatch();

  const [booking, setBooking] = useState(BOOKING);

  const {
    bookedByName,
    email,
    phoneNumber,
    name,
    startDate,
    endDate,
    massIntention,
  } = booking;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatingBooking = { ...booking, [name]: value };
    setBooking(updatingBooking);
  };

  const handleSave = () => {
    dispatch(
      setBookedBy({
        name,
        email,
        phoneNumber,
      })
    );

    dispatch(
      addIntention({
        name,
        massIntention,
        startDate,
        endDate,
      })
    );
  };

  const handleCancel = () => {
    setBooking(BOOKING);
  };

  return (
    <section>
      <h3>Please fill this form to book mass</h3>

      <p>
        Ensure you fill the details correctly to avoid error when reading your
        mass intention.
      </p>

      <BookedBy
        bookedByName={bookedByName}
        email={email}
        phoneNumber={phoneNumber}
        handleChange={handleInputChange}
      />

      <Intention
        name={name}
        handleChange={handleInputChange}
        massIntention={massIntention}
        startDate={startDate}
        endDate={endDate}
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default InitialBooking;
