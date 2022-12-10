import { v4 as uuidv4 } from "uuid";

export const BOOKING = {
  name: {
    value: "",
    error: "",
  },
  email: {
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
  phoneNumber: {
    value: "",
    error: "",
  },
  massIntention: {
    value: "",
    error: "",
  },
  bookedByName: {
    value: "",
    error: "",
  },
  id: uuidv4(),
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

export const validateInputs = (booking) => {
  const updatedBooking = { ...booking };
  const keys = Object.keys(booking);
  const dates = ["startDate", "endDate"];
  let errorExists = false;

  for (const key of keys) {
    if (key === "id") continue;

    if (
      (!dates.includes(key) && !booking[key].value) ||
      (dates.includes(key) && booking[key].value === null)
    ) {
      updatedBooking[key].error = ERRORS[key];
      errorExists = true;
    }
  }

  return { updatedBooking, errorExists };
};
