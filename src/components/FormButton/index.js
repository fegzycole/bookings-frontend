import Button from "@mui/material/Button";
import React from "react";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
  background: #007464 !important;
  text-transform: capitalize;
  font-size: 15px;
  font-family: Satoshi;
  font-weight: 300;
  padding: 15px;
`;

const FormButton = ({ value }) => {
  return (
    <StyledButton type="submit" variant="contained" color="primary">
      {value}
    </StyledButton>
  );
};

export default FormButton;
