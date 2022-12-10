import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/system";

import DatePickerIcon from "./DatepickerIcon";

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
})`
  font-family: Museo;

  & .MuiOutlinedInput-input {
    padding: 10px;
    padding-left: 0px;
    font-size: 14px;
  }

  & .MuiOutlinedInput-root {
    border-bottom: 1px solid black;
    border-radius: 0px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiButtonBase-root {
    padding: 0;
    margin: 0;
    padding-top: 4px;

    &:hover {
      background: none;
    }
  }

  & .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    margin: 0;
  }

  & .MuiFormLabel-root {
    color: #808080;

    &:focused {
      color: #808080;
    }
  }
`;

const DatePicker = ({
  handleChange,
  value,
  placeholder,
  minDate,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        openTo="day"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder,
            }}
          />
        )}
        inputFormat="MM-DD-YYYY"
        components={{
          OpenPickerIcon: DatePickerIcon,
        }}
        InputAdornmentProps={{ position: "start" }}
        minDate={minDate}
        className="w-full border-b border-black"
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
