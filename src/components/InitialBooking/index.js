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
    <section className="mt-4 pt-4 font-Museo lg:w-[50%] 2xl:w-[40%]">
      <h3 className="mt-5 text-lg mb-3 text-customBlack-200">
        Please fill this form to book mass
      </h3>

      <p className="text-xs text-customBlack-200">
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
