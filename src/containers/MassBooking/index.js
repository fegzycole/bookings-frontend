import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DisabledInputContainer from "../../components/DisabledInputContainer";
import { formatTime } from "../../helpers";
import VectorIcon from "../../images/fullLeftArrow.svg";

const MassBooking = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  const { intentions } = useSelector((state) => state.apiBookings);
  const [intention, setIntention] = useState();
  const [startEndDate, setStartEndDate] = useState();

  useEffect(() => {
    if (intention) {
      const normalizedStartDate = formatTime(intention.startDate);
      const normalizedEndDate = formatTime(intention.endDate);

      setStartEndDate(`${normalizedStartDate} - ${normalizedEndDate}`);
    }
  }, [intention]);

  useEffect(() => {
    if (intentions.length) {
      const foundIntention = intentions.find(
        (intention) => intention.id.toString() === id
      );
      setIntention(foundIntention);
    }
  }, [id, intentions]);

  const renderNotFound = () => {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] w-full">
        <h2 className="text-4xl">Intention Not Found</h2>
      </div>
    );
  };

  const handleClick = () => {
    return navigate("/admin/massBookings");
  };

  return (
    <div className="mt-[-30px] lg:mt-0">
      <button className="flex items-center" onClick={handleClick}>
        <img
          src={VectorIcon}
          alt="left-caret"
          className="w-[6.81px] h-[11.55px] lg:w-[11.67px] lg:h-[16px]"
        />
        <h3 className="ml-3">Mass Booking Intention details</h3>
      </button>
      {intention ? (
        <div className="mt-5 lg:mt-10">
          <h3 className="text-xl mb-5">Intention Booked By</h3>
          <div className="lg:flex w-full justify-between lg:mb-5">
            <DisabledInputContainer label="Name" value={intention.bookedBy} />
            <DisabledInputContainer
              label="Phone Number"
              value={intention.phoneNumber}
            />
          </div>
          <div className="lg:flex w-full justify-between mb-5 lg:mb-10">
            <DisabledInputContainer
              label="Amount Paid"
              value={intention.amountPaid}
            />
          </div>

          <h3 className="text-xl mb-5">Intention For</h3>
          <div className="lg:flex w-full justify-between lg:mb-5">
            <DisabledInputContainer label="Name" value={intention.name} />
            <DisabledInputContainer
              label="Start - End Date"
              value={startEndDate}
            />
          </div>

          <div className="w-full justify-between lg:mb-5">
            <DisabledInputContainer
              fullwidth
              bigText
              label="Intention"
              value={intention.massIntention}
            />
          </div>
        </div>
      ) : (
        renderNotFound()
      )}
    </div>
  );
};

export default MassBooking;
