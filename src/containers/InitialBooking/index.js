import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";
import useBooking from "../../hooks/useBooking";
import { resetStore } from "../../store/bookings/actions";

const InitialBooking = () => {
  const {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  } = useBooking({ initialBooking: true });

  const {
    bookedByName,
    email,
    phoneNumber,
    name,
    massIntention,
    startDate,
    endDate,
  } = booking;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-4 font-Museo lg:w-[50%] 2xl:w-[40%]">
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
        mode="create"
      />

      <Intention
        name={name}
        handleChange={handleInputChange}
        massIntention={massIntention}
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default InitialBooking;
