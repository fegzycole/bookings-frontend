import React from "react";
import { numberWithCommas } from "../../helpers";
import Wave from "../../images/wave.svg";

const PaymentHeaderStat = ({ showImage, header, value }) => {
  return (
    <div
      className={`relative ${
        showImage ? "bg-customGreen-100" : "bg-customYellow-300"
      } w-[30%] h-[151px] ${
        showImage ? "text-white" : "text-customBlack-200"
      } p-5 rounded-lg font-Satoshi`}
    >
      {showImage && (
        <img alt="wave" src={Wave} className="absolute left-0 bottom-0 w-full" />
      )}
      <h3 className="text-xl mb-3">{header}</h3>
      <h6 className="text-2xl font-semibold">{`${
        showImage ? "" : "₦"
      } ${numberWithCommas(value)}`}</h6>
    </div>
  );
};

export default PaymentHeaderStat;
