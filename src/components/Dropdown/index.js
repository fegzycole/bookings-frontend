import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";

export const StyledDropdown = styled(Select)`
  font-family: Museo;

  & .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    background: #fff;
    border-radius: 8px;
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
`;

const Dropdown = ({ dropdownItems, selectedValue }) => {
  return (
    <StyledDropdown value={selectedValue}>
      {dropdownItems.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledDropdown>
  );
};

export default Dropdown;
