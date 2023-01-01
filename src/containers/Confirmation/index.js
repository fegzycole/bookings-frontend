import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { styled } from "@mui/system";
import Background from "../../components/Background";
import ConfirmationItem from "./ConfirmationItem";

const StyledLink = styled(Link)`
  font-family: Museo;
  color: #007464;
`;

const Confirmation = () => {
  const { apiSuccessData } = useSelector((state) => state.bookings);
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiSuccessData) {
      navigate("/");
    }
  }, [apiSuccessData, navigate]);

  if (!apiSuccessData) {
    return navigate("/");
  }

  return (
    <div className="pt-10 mt-10 font-Museo">
      <Background />
      <h2 className="text-2xl lg:text-3xl text-customBlack-200 font-Museo pb-4">
        Payment Confirmed
      </h2>

      <div className="p-5 my-4 bg-customGray-300 w-full lg:w-[755px]">
        <h4 className="text-center text-lg lg:text-xl mb-2">
          Your Payment was successful
        </h4>
        <ConfirmationItem value={`Name: ${apiSuccessData.bookedByName.value}`} />

        <ConfirmationItem value={`Name: ${apiSuccessData.email.value}`} />

        <ConfirmationItem value={`Name: ${apiSuccessData.phoneNumber.value}`} />

        <ConfirmationItem value={`Name: ${apiSuccessData.amountPaid.value}`} />

        <ConfirmationItem value="Payment Status: Completed" />
      </div>

      <p className="text-base text-customBlack-200">
        Do you want to book another mass?{" "}
        <StyledLink to="/">Go to form</StyledLink> or
        <a href="https://reginapaciscc.org/" className="text-customGreen-100">
          {" "}
          Visit the parish website
        </a>
      </p>
    </div>
  );
};

export default Confirmation;
