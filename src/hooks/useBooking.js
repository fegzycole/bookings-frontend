import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getBooking, validateInputs, getBasicBooking } from "../helpers";
import { addIntention, setBookedBy } from "../store/bookings/slice";

const useBooking = ({ initialBooking, existingBooking, admin }) => {
  const intention = initialBooking ? getBooking() : getBasicBooking();
  const usedBookingData = existingBooking ? existingBooking : intention;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(usedBookingData);

  const {
    bookedByName,
    email,
    phoneNumber,
    name,
    startDate,
    endDate,
    massIntention,
    id,
  } = booking;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedBooking = { ...booking, [name]: { value, error: "" } };
    setBooking(updatedBooking);
  };

  const handleDateChange = (type) => (newDate) => {
    const normalizedDate = newDate.utc(true);
    const updatedBooking = { ...booking };

    if (type === "startDate") {
      updatedBooking.startDate.value = normalizedDate;
      updatedBooking.startDate.error = "";
    } else {
      updatedBooking.endDate.value = normalizedDate;
      updatedBooking.endDate.error = "";
    }

    setBooking(updatedBooking);
  };

  const handleSave = () => {
    const { updatedBooking, errorExists } = validateInputs(booking);

    if (errorExists) {
      setBooking(updatedBooking);

      return errorExists;
    }

    dispatch(
      addIntention({
        name,
        massIntention,
        startDate,
        endDate,
        id,
      })
    );

    if (initialBooking) {
      dispatch(
        setBookedBy({
          bookedByName,
          email,
          phoneNumber,
        })
      );

      if (!admin) {
        navigate("/checkout");
      } else {
        navigate("/admin/createBooking/save");
      }
    }

    handleCancel();
  };

  const handleCancel = () => {
    setBooking(usedBookingData);
  };

  return {
    booking,
    handleCancel,
    handleSave,
    handleDateChange,
    handleInputChange,
  };
};

export default useBooking;
