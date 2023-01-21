import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchBarIcon from "./SearchBarIcon";

const SearchBar = ({ handleChange, value }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchBarIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      value={value}
      placeholder="Search by name"
    />
  );
};

export default SearchBar;
