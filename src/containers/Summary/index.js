import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import SectionHeader from "../../components/SectionHeader";
import DisabledInput from "../../components/DisabledInput";
import SummaryItem from "../../components/SummaryItem";
import PaystackIcon from "../../images/paystack.svg";
import BookedBy from "../../components/BookedBy";
import { useSummary } from "./useSummary";
import Loader from "../../components/Loader";
import { getTotalPrice } from "../../helpers";

const Summary = () => {
  const {
    intentions,
    bookedBy,
    handleUpdateBookedBy,
    handleDateChange,
    handleInputChange,
    triggerPaymentModal,
    openLoader,
  } = useSummary();

  const [errorExists, setErrorExists] = useState(false);

  useEffect(() => {
    setErrorExists(false);

    if (intentions && intentions.length > 0) {
      const intentionKeys = Object.keys(intentions[0]);

      for (const intention of intentions) {
        for (const key of intentionKeys) {
          if (intention[key].error) {
            setErrorExists(true);
          }
        }
      }
    }

    if (bookedBy) {
      const bookedByKeys = Object.keys(bookedBy);

      for (const key of bookedByKeys) {
        if (bookedBy[key].error) {
          setErrorExists(true);
        }
      }
    }
  }, [bookedBy, intentions]);

  return (
    <div className="mt-4">
      <Loader open={openLoader} />
      {intentions.length > 0 ? (
        <>
          <SectionHeader label="SUMMARY" />

          <div className="w-full lg:w-[48%]">
            <BookedBy
              bookedByName={bookedBy.bookedByName}
              handleChange={handleUpdateBookedBy}
              email={bookedBy.email}
              phoneNumber={bookedBy.phoneNumber}
              mode="update"
            />
          </div>

          <div className="mt-3">
            <SectionHeader label="Masses Booked" greyLine />
          </div>

          <div className="mt-3">
            <DisabledInput value={intentions.length} smallBox />
          </div>

          <div className="my-3">
            <SectionHeader label="Please check your intentions and edit where necessary" />
          </div>

          <div className="flex flex-wrap justify-between">
            {intentions.map((intention, index) => (
              <SummaryItem
                intention={intention}
                handleDateChange={handleDateChange}
                handleInputChange={handleInputChange}
                key={intention.id}
                index={index}
              />
            ))}
          </div>

          <div
            className={`${
              intentions.length > 1 ? "w-full" : "lg:w-[48%]"
            } py-4`}
          >
            <SectionHeader label="Total" />
            <DisabledInput value={`₦ ${getTotalPrice(intentions) / 100}`} />
          </div>

          <Tooltip
            title={
              errorExists ? "Please resolve all errors to continue" : ""
            }
            placement="top"
          >
            <div className="mb-5">
              <SectionHeader label="PAYMENT METHOD" />

              <button
                className="flex text-left items-center border-[1px] p-3 w-full lg:w-[48%] mb-4 border-customBlack-700 rounded-lg"
                onClick={triggerPaymentModal}
                disabled={errorExists}
              >
                <img src={PaystackIcon} alt="Pay Stack Icon" />
                <div className="ml-3">
                  <h6 className="text-lg">Paystack</h6>
                  <p className="text-sm text-customBlack-200 font-light">
                    We do not store your payment details
                  </p>
                </div>
              </button>

              <p className="text-sm font-light">
                We protect your payment information using encryption to provide
                bank-level security
              </p>
            </div>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Summary;
