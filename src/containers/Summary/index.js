import React from "react";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import SectionHeader from "../../components/SectionHeader";
import DisabledInput from "../../components/DisabledInput";
import { editIntention } from "../../store/bookings/actions";
import Item from "../../components/SummaryItem";
import PaystackIcon from "../../images/paystack.svg";
import {
  getErrorMessage,
  getOffering,
  stringifySnackBarProps,
} from "../../helpers";

const Summary = () => {
  const { intentions, bookedBy } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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

  const getTotalPrice = () => {
    let totalPrice = 0;

    intentions.forEach((intention) => {
      totalPrice += getOffering(
        intention.startDate.value,
        intention.endDate.value
      );
    });

    return totalPrice * 100;
  };

  const initializePayment = usePaystackPayment({
    amount: getTotalPrice(),
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    email: bookedBy.email.value,
    phone: bookedBy.phoneNumber.value,
  });

  const handleSuccess = () => {
    axios
      .post(process.env.REACT_APP_API_URL, {
        bookings: intentions.map((massIntention) => ({
          name: massIntention.name.value,
          massIntention: massIntention.massIntention.value,
          startDate: massIntention.startDate.value,
          endDate: massIntention.endDate.value,
          bookedBy: bookedBy.bookedByName.value,
          email: bookedBy.email.value,
          phoneNumber: bookedBy.phoneNumber.value,
          amountPaid: getOffering(
            massIntention.startDate.value,
            massIntention.endDate.value
          ),
        })),
      })
      .then(() => {
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: "Booking(s) created successfully",
            title: "Success",
          })
        );
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "Unable to complete mass booking, please contact the administrator",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      });
  };

  const triggerPaymentModal = () => {
    initializePayment(handleSuccess);
  };

  return (
    <div className="mt-4">
      {intentions.length > 0 ? (
        <>
          <SectionHeader label="SUMMARY" />

          <div className="mt-3">
            <SectionHeader label="Requester Information" greyLine />
          </div>

          

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

      <div className="my-5">
        <SectionHeader label="PAYMENT METHOD" />

        <button
          className="flex text-left items-center border-[1px] p-3 w-full lg:w-[48%] mb-4 border-customBlack-700 rounded-lg"
          onClick={triggerPaymentModal}
        >
          <img src={PaystackIcon} alt="Pay Stack Icon" />
          <div className="ml-3">
            <h6 className="text-lg">Paystack</h6>
            <p className="text-sm text-customBlack-200 font-light">
              We do not store your payment details
            </p>
          </div>
        </button>

        <p className="text-sm font-light">
          We protect your payment information using encryption to provide
          bank-level security
        </p>
      </div>
    </div>
  );
};

export default Summary;
