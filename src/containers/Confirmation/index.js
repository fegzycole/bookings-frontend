import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { styled } from "@mui/system";

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
      <h2 className="text-4xl text-customBlack-200 font-Museo pb-4">
        Payment Status
      </h2>

      <div className="p-5 my-4 bg-customGray-300 w-[755px]">
        <h4 className="text-center text-2xl mb-2">
          Your Payment was successful
        </h4>
        <h6 className="py-3 text-lg font-light">
          Name: {apiSuccessData.bookedByName.value}
        </h6>
        <h6 className="py-3 text-lg font-light">
          Email: {apiSuccessData.email.value}
        </h6>
        <h6 className="py-3 text-lg font-light">
          Phone Number: {apiSuccessData.phoneNumber.value}
        </h6>
        <h6 className="py-3 text-lg font-light">
          Amount Paid: ₦{apiSuccessData.amountPaid.value}
        </h6>
        <h6 className="py-3 text-lg font-light">Payment Status: Completed</h6>
      </div>

      <p className="text-lg text-customBlack-200">
        Do you want to book another mass?{" "}
        <StyledLink to="/">Go to form</StyledLink> or
        <a href="https://reginapaciscc.org/" className="text-customGreen-100"> Visit the parish website</a>
      </p>
    </div>
  );
};

export default Confirmation;
