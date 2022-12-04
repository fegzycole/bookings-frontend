import React from "react";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePickerComponent from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import DatePickerIcon from "../DatePickerIcon";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
})`
  & .MuiOutlinedInput-input {
    padding: 9px 15px;
  }
`;

const DatePicker = ({ value, handleChange, placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePickerComponent
        openTo="day"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <StyledTextField {...params} placeholder={placeholder} />
        )}
        inputFormat="MM/DD/YYYY"
        components={{
          OpenPickerIcon: DatePickerIcon,
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
