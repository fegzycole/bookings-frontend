import * as React from "react";
import Dialog from "@mui/material/Dialog";

export const Modal = ({ handleClose, handleLogout, open }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="rounded-xl">
        <div className="w-[564px] h-[331px] flex flex-col justify-center items-center">
          <div className="font-Inter">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-customBlack-800">
                Log Out
              </h3>
              <p className="font-normal">Are you sure you want to log out?</p>
            </div>
            <div className="mt-[50px]">
              <button
                onClick={handleClose}
                className="w-[172px] rounded-lg border-2 border-customGreen-100 mr-[20px] p-3 text-customGreen-100 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-[172px] rounded-lg border-2 border-customRed-100 bg-customRed-100 p-3 text-white font-semibold"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
