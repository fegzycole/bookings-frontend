import React from "react";
import Background from "../../components/Background";

import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";
import useBooking from "../../hooks/useBooking";

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

  return (
    <section className="pt-4 font-Museo lg:w-[50%] 2xl:w-[40%]">
      <Background />
      <h3 className="mt-5 text-xl lg:text-3xl mb-3 text-customBlack-200">
        Please fill this form to book mass
      </h3>

      <p className="text-sm lg:text-base text-customBlack-200">
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
