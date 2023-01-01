import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  editBookedBy,
  editIntention,
  setSuccessResponseData,
} from "../../store/bookings/actions";
import {
  getErrorMessage,
  getOffering,
  stringifySnackBarProps,
  validateInputs,
  getTotalPrice,
} from "../../helpers";

export const useSummary = () => {
  const { intentions, bookedBy } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [openLoader, setOpenLoader] = useState(false);

  const handleInputChange = (id) => (e) => {
    const { name, value } = e.target;

    const foundBooking = intentions.find((intention) => intention.id === id);

    let updatedBooking = { ...foundBooking, [name]: { value, error: "" } };

    const { updatedBooking: validatedBooking } = validateInputs(updatedBooking);

    dispatch(editIntention(validatedBooking));
  };

  const handleDateChange = (id) => (type) => (value) => {
    const foundBooking = intentions.find((intention) => intention.id === id);

    let updatedBooking = { ...foundBooking, [type]: { error: "" } };

    const today = moment();

    if (!value.isValid()) {
      updatedBooking = {
        ...foundBooking,
        [type]: { error: "Invalid date specified" },
      };
    }

    if (value.isBefore(today, "day")) {
      updatedBooking = {
        ...foundBooking,
        [type]: {
          error: "Selected date must be greater than or equal to today",
        },
      };
    }

    if (type === "startDate") {
      const endDate = foundBooking.endDate;

      if (value.isAfter(endDate.value, "day")) {
        updatedBooking = {
          ...foundBooking,
          [type]: {
            error: "Start date must be less than or equal to end date",
          },
        };
      }

      if (
        endDate.value.isValid() &&
        endDate.value.isSameOrAfter(value, "day") &&
        endDate.error
      ) {
        updatedBooking = {
          ...foundBooking,
          startDate: { error: updatedBooking.startDate.error },
          endDate: {
            error: "",
            value: endDate.value,
          },
        };
      }
    }

    if (type === "endDate") {
      const startDate = foundBooking.startDate;

      if (value.isBefore(startDate.value, "day")) {
        updatedBooking = {
          ...foundBooking,
          [type]: {
            error: "End date must be greater than or equal to start date",
          },
        };
      }

      if (
        startDate.value.isValid() &&
        startDate.value.isSameOrBefore(value, "day") &&
        startDate.error
      ) {
        updatedBooking = {
          ...foundBooking,
          endDate: { error: updatedBooking.endDate.error },
          startDate: {
            error: "",
            value: startDate.value,
          },
        };
      }
    }

    updatedBooking = {
      ...updatedBooking,
      [type]: { value, error: updatedBooking[type].error },
    };

    dispatch(editIntention(updatedBooking));
  };

  const handleUpdateBookedBy = (e) => {
    const { name, value } = e.target;
    const updatedBookedBy = { ...bookedBy, [name]: { value, error: "" } };
    const { updatedBooking } = validateInputs(updatedBookedBy);
    dispatch(editBookedBy(updatedBooking));
  };

  const initializePayment = usePaystackPayment({
    amount: getTotalPrice(intentions),
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    email: bookedBy.email.value,
    phone: bookedBy.phoneNumber.value,
  });

  const handleSuccess = () => {
    setOpenLoader(true);
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
      .then((response) => {
        const {
          data: { data },
        } = response;

        setOpenLoader(false);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: "Booking(s) created successfully",
            title: "Success",
          })
        );
        dispatch(
          setSuccessResponseData({
            bookedByName: { value: data.name, error: "" },
            phoneNumber: { value: data.phoneNumber, error: "" },
            email: { value: data.email, error: "" },
            amountPaid: { value: data.amountPaid, error: "" },
          })
        );

        navigate("/confirmation", { replace: true });
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

  return {
    intentions,
    bookedBy,
    handleUpdateBookedBy,
    handleDateChange,
    handleInputChange,
    triggerPaymentModal,
    openLoader
  };
};
