import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SectionHeader from "../../components/SectionHeader";
import DisabledInput from "../../components/DisabledInput";
import { editIntention } from "../../store/bookings/actions";
import Item from "../../components/SummaryItem";

const Summary = () => {
  const { intentions } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  const handleInputChange = (id) => (e) => {
    const { name, value } = e.target;

    const foundBooking = intentions.find((intention) => intention.id === id);

    const updatedBooking = { ...foundBooking, [name]: { value, error: "" } };

    dispatch(editIntention(updatedBooking));
  };

  const handleDateChange = (id) => (type) => (value) => {
    const foundBooking = intentions.find((intention) => intention.id === id);

    const updatedBooking = { ...foundBooking, [type]: { value, error: "" } };
    dispatch(editIntention(updatedBooking));
  };

  return (
    <div className="mt-4">
      {intentions.length > 0 ? (
        <>
          <SectionHeader label="SUMMARY" />

          <div className="mt-3">
            <SectionHeader label="Masses Booked" greyLine />
          </div>

          <div className="mt-3">
            <DisabledInput value={intentions.length} smallBox />
          </div>

          <div className="my-3">
            <SectionHeader label="Please check your intentions and edit where necessary" />
          </div>

          <div className="flex flex-wrap justify-between">
            {intentions.map((intention, index) => (
              <Item
                intention={intention}
                handleDateChange={handleDateChange}
                handleInputChange={handleInputChange}
                key={intention.id}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Summary;
