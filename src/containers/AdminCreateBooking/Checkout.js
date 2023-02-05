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

const AdminCheckout = () => {
  const {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  } = useBooking({ initialBooking: false, admin: true });

  const { bookedBy } = useSelector((state) => state.bookings);
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
      console.log({ errorExists });
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
    <div className="font-Museo pl-10 mt-[-30px]">
      <h3 className="text-lg lg:text-3xl mb-2 font-normal text-customBlack-200">
        The initial intention has been saved.
      </h3>
      <p className="text-xs lg:text-base">
        Would you like to add another intention?
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
          <Summary admin />
        </Accordion>
      </div>
    </div>
  );
};

export default AdminCheckout;
