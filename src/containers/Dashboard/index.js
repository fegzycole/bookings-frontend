import React, { useCallback, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import {
  adminFilterOptions,
  getErrorMessage,
  stringifySnackBarProps,
} from "../../helpers";
import { getIntentions } from "../../store/apiBookings/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setFetchingIntentions } from "../../store/apiBookings/slice";
import Loader from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";

const Dashboard = () => {
  const [selectedPeriod] = useState(adminFilterOptions[0].value);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { intentions, fetchingIntentions } = useSelector(
    (state) => state.apiBookings
  );

  const handleGetIntentions = useCallback(async () => {
    try {
      dispatch(setFetchingIntentions(true));

      await dispatch(getIntentions());

      dispatch(setFetchingIntentions(false));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(setFetchingIntentions(false));
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to fetch intentions, please contact the developer",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    handleGetIntentions();
  }, [handleGetIntentions]);

  if (fetchingIntentions) {
    return <Loader open />;
  }

  return (
    <div className="relative p-10 pt-5">
      <div>
        <h2>Mass Booking Intention</h2>
        <h6>Keep track of all the mass booking.</h6>
      </div>
      <div>
        <SearchBar />
        <ExportButton text="Export Mass Intension" />
        <DatePicker />
      </div>
      <div>
        <h6>Filter mass booking</h6>
        <Select value={selectedPeriod}>
          {adminFilterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <IntentionsTable intentions={intentions} />
      </div>
    </div>
  );
};

export default Dashboard;
