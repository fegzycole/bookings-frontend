import { useCallback, useEffect, useState } from "react";
import {
  formatTime,
  getCount,
  getErrorMessage,
  stringifySnackBarProps,
} from "../../helpers";
import { getStats } from "../../store/apiBookings/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setFetchingStats } from "../../store/apiBookings/slice";
import { isEqual } from "lodash";

const PAGE_SIZE = 9;

const defaultPeriod = "day";

export const useManagePayments = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [paginatedIntentions, setPaginatedIntentions] = useState([]);
  const [intentionsData, setIntentionsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [usedPeriod, setUsedPeriod] = useState();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {
    stats,
    fetchingStats,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
  } = useSelector((state) => state.apiBookings);

  const updatePageNumber = (_e, pageNo) => {
    setPageNumber(pageNo);
  };

  const handleDateChange = (type) => (newDate) => {
    const normalizedDate = newDate.utc(true);
    setStartDate(normalizedDate);
  };

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;

    setSelectedPeriod(newValue);
    setStartDate(null);
  };

  useEffect(() => {
    if (selectedPeriod) {
      setUsedPeriod(`?type=${selectedPeriod}`);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (startDate !== null) {
      setSelectedPeriod("");

      const format = "DD-MM-YYYY";

      const normalizedStartDate = formatTime(startDate, format);

      setUsedPeriod(`?date=${normalizedStartDate}`);
    }
  }, [startDate]);

  const count = getCount(intentionsData.length, PAGE_SIZE);

  const handleGetStats = useCallback(async () => {
    if (usedPeriod) {
      try {
        dispatch(setFetchingStats(true));

        await dispatch(getStats(usedPeriod));

        dispatch(setFetchingStats(false));
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        dispatch(setFetchingStats(false));
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "Unable to fetch payment stats, please contact the developer",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  }, [dispatch, enqueueSnackbar, usedPeriod]);

  useEffect(() => {
    setIntentionsData(stats);
  }, [stats]);

  useEffect(() => {
    handleGetStats();
  }, [handleGetStats]);

  useEffect(() => {
    let newPaginatedIntentions = [];

    if (intentionsData.length) {
      newPaginatedIntentions = intentionsData.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );
    } else {
      newPaginatedIntentions = [];
    }

    if (!isEqual(paginatedIntentions, newPaginatedIntentions)) {
      setPaginatedIntentions(newPaginatedIntentions);
    }
  }, [intentionsData, startIndex, paginatedIntentions]);

  useEffect(() => {
    const newIndex = (pageNumber - 1) * PAGE_SIZE;

    setStartIndex(newIndex);
  }, [pageNumber, startIndex]);

  return {
    fetchingStats,
    selectedPeriod,
    paginatedIntentions,
    count,
    updatePageNumber,
    pageNumber,
    intentionsData,
    handleDropdownChange,
    startDate,
    handleDateChange,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
  };
};
