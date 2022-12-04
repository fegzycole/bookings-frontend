import { v4 as uuidv4 } from "uuid";

export const BOOKING = {
  name: "",
  email: "",
  startDate: undefined,
  endDate: undefined,
  amountPaid: 0,
  phoneNumber: 0,
  massIntention: "",
  bookedByName: "",
  id: uuidv4(),
};
