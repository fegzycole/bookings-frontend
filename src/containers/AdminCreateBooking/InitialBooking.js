import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";
import useBooking from "../../hooks/useBooking";
import { resetStore } from "../../store/bookings/slice";

const AdminInitialBooking = () => {
  const {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  } = useBooking({ initialBooking: true, admin: true });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <section className="font-Museo lg:w-[700px] pl-10 mt-[-30px]">
      <BookedBy
        bookedByName={bookedByName}
        email={email}
        phoneNumber={phoneNumber}
        handleChange={handleInputChange}
        mode="create"
        sectionHeader="REQUESTER INFORMATION"
      />

      <Intention
        name={name}
        handleChange={handleInputChange}
        massIntention={massIntention}
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
        textAreaPlaceholder="Write the prayer request *"
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default AdminInitialBooking;
