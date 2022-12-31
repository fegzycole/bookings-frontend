import React from "react";

import Intention from "../../components/Intention";
import ButtonSection from "../../components/ButtonSection";
import Accordion from "../../components/Accordion";

import useBooking from "../../hooks/useBooking";
import Summary from "../Summary";

const Checkout = () => {
  const {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  } = useBooking({ initialBooking: false });

  const { name, startDate, endDate, massIntention } = booking;

  return (
    <div className="mt-5 pt-5 font-Museo">
      <h3 className="text-lg lg:text-4xl mb-2 font-normal text-customBlack-200">
        Your mass booking intention have been saved.
      </h3>
      <p className="text-xs lg:text-lg">
        Before we proceed, would you like to book another intention?
      </p>

      <div className="mt-3 lg:mt-5 lg:pt-5">
        <Accordion summary="Yes">
          <Intention
            name={name}
            handleChange={handleInputChange}
            massIntention={massIntention}
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />

          <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
        </Accordion>
        <Accordion summary="No" fullwidth>
          <Summary />
        </Accordion>
      </div>
    </div>
  );
};

export default Checkout;
