import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import Intention from "../../components/Intention";
import ButtonSection from "../../components/ButtonSection";
import Accordion from "../../components/Accordion";
import { stringifySnackBarProps } from "../../helpers";

import useBooking from "../../hooks/useBooking";
import Summary from "../Summary";
import PriceTable from "../../components/PriceTable";
import Background from "../../components/Background";

const Checkout = () => {
  const {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  } = useBooking({ initialBooking: false });

  const { bookedBy, intentions } = useSelector((state) => state.bookings);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [yesExpanded, setYesExpanded] = useState(false);
  const [noExpanded, setNoExpanded] = useState(false);

  const toggleExpanded = (type) => {
    if (type === "yes") {
      setYesExpanded((prev) => !prev);
    } else {
      setNoExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!bookedBy) {
      navigate("/");
    }
  }, [bookedBy, navigate]);

  if (!bookedBy) {
    return navigate("/");
  }

  const handleNewIntention = () => {
    const errorExists = handleSave();

    if (!errorExists) {
      setYesExpanded(false);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "Intention Saved",
          title: "Info",
        })
      );
    }
  };

  const { name, startDate, endDate, massIntention } = booking;

  return (
    <div className="mt-5 pt-5 font-Museo">
      {!noExpanded && <Background />}
      <h3 className="text-lg lg:text-3xl mb-2 font-normal text-customBlack-200">
        Your mass booking intention has been saved.
      </h3>
      <p className="text-xs lg:text-base">
        Before we proceed, would you like to book another intention?
      </p>

      <div className="mt-3 lg:mt-5 lg:pt-5">
        <div className="mb-10">
          <Accordion
            summary="Yes"
            expanded={yesExpanded}
            toggleExpanded={() => toggleExpanded("yes")}
          >
            <Intention
              name={name}
              handleChange={handleInputChange}
              massIntention={massIntention}
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
            />

            <ButtonSection
              handleCancel={handleCancel}
              handleSave={handleNewIntention}
            />
          </Accordion>
        </div>

        <Accordion
          summary="No"
          fullwidth
          expanded={noExpanded}
          toggleExpanded={toggleExpanded}
        >
          <Summary />
        </Accordion>
      </div>

      {noExpanded && intentions && intentions.length > 0 && (
        <div className="lg:absolute top-[100px] mb-5 right-[4%] w-full lg:w-[446px]">
          <PriceTable />
        </div>
      )}
    </div>
  );
};

export default Checkout;
