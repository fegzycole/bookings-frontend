import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const StyledAccordion = styled(Accordion, {
  name: "StyledAccordion",
})`
  background: inherit;
  box-shadow: none;
  border: none;

  &::before {
    background: none;
  }

  margin-bottom: 10px;
`;

const StyledAccordionSummary = styled(AccordionSummary, {
  name: "StyledAccordionSummary",
})`
  border: 1px solid #007464;
  border-radius: 4px;

  & .MuiAccordionSummary-content {
    margin: 0 !important;
  }

  min-height: initial !important;
  padding: 10px;

  @media screen and (min-width: 1024px) {
    width: 55%;
  }

  @media screen and (min-width: 1536px) {
    width: 40%;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails, {
  name: "StyledAccordionDetails",
})`
  padding: 0;

  @media screen and (min-width: 1024px) {
    width: ${(props) => (props.fullWidth ? "100%" : "55%")};
  }
`;

const IntentionAccordion = ({ summary, children }) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h6 className="text-sm lg:text-lg text-customBlack-600 2xl:text-lg">{summary}</h6>
      </StyledAccordionSummary>

      <StyledAccordionDetails>{children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default IntentionAccordion;
