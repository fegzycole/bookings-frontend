import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const getBasicBooking = () => {
  return {
    massIntention: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
    startDate: {
      value: null,
      error: "",
    },
    endDate: {
      value: null,
      error: "",
    },
    id: uuidv4(),
  };
};

export const getBooking = () => {
  const basicBooking = getBasicBooking();

  return {
    ...basicBooking,
    email: {
      value: "",
      error: "",
    },
    phoneNumber: {
      value: "",
      error: "",
    },
    bookedByName: {
      value: "",
      error: "",
    },
  };
};

export const ERRORS = {
  name: "Who is this mass being booked for?",
  email: "Email is required",
  startDate: "Start date is required",
  endDate: "End date is required",
  phoneNumber: "Please enter a valid phone number",
  massIntention: "Mass Intention is required",
  bookedByName: "Name is required",
};

export const isValidEmail = (text) => {
  return (
    String(text)
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  );
};

export const isValidPhoneNumber = (phoneNumber) => {
  return String(phoneNumber)
    .toLowerCase()
    .match(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d+)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
    );
};

export const validateInputs = (booking) => {
  const updatedBooking = { ...booking };
  const keys = Object.keys(booking);
  const dates = ["startDate", "endDate"];
  let errorExists = false;

  for (const key of keys) {
    if (key === "id") continue;

    const value = booking[key].value;

    if (
      (!dates.includes(key) && (!value || !value.trim())) ||
      (dates.includes(key) && value === null)
    ) {
      updatedBooking[key].error = ERRORS[key];
      errorExists = true;
    }

    if (key === "email" && value) {
      if (!isValidEmail(value)) {
        updatedBooking[key].error = "Please Enter a valid email";
        errorExists = true;
      }
    }

    if (key === "phoneNumber" && value) {
      if (!isValidPhoneNumber(value)) {
        updatedBooking[key].error = ERRORS[key];
        errorExists = true;
      }
    }
  }

  return { updatedBooking, errorExists };
};

export const getOffering = (startDate, endDate) => {
  let price = 0;

  if (startDate === null || endDate === null) return price;

  const endDateToMoment = moment(endDate);

  let newDateToMoment = moment(startDate);

  while (endDateToMoment.diff(newDateToMoment) >= 0) {
    if (newDateToMoment.day() === 0) {
      price += 200;
    } else {
      price += 100;
    }

    newDateToMoment = newDateToMoment.add(1, "day");
  }

  return price;
};

export const stringifySnackBarProps = (props) => {
  return JSON.stringify(props);
};

export const getErrorMessage = (error) => {
  let errorMessage;
  if (error.response) {
    if (error.response.data.error) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = error.response.data.errors;
    }
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};
