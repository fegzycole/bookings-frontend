import { v4 as uuidv4 } from "uuid";

export const BOOKING = {
  name: {
    value: "",
  },
  email: {
    value: "",
  },
  startDate: {
    value: undefined,
  },
  endDate: {
    value: undefined,
  },
  amountPaid: {
    value: 0,
  },
  phoneNumber: {
    value: "",
  },
  massIntention: {
    value: "",
  },
  bookedByName: {
    value: "",
  },
  id: uuidv4(),
};
