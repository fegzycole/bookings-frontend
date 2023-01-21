import { useCallback, useEffect, useState } from "react";
import {
  adminFilterOptions,
  getCount,
  getErrorMessage,
  stringifySnackBarProps,
} from "../../helpers";
import { getIntentions } from "../../store/apiBookings/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setFetchingIntentions } from "../../store/apiBookings/slice";

const PAGE_SIZE = 8;

export const useDashboard = () => {
  const [selectedPeriod] = useState(adminFilterOptions[0].value);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [paginatedIntentions, setPaginatedIntentions] = useState([]);
  const [intentionsData, setIntentionsData] = useState([]);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { intentions, fetchingIntentions } = useSelector(
    (state) => state.apiBookings
  );

  const updatePageNumber = (_e, pageNo) => {
    setPageNumber(pageNo);
  };

  const count = getCount(intentionsData.length, PAGE_SIZE);

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
    setIntentionsData(intentions);
  }, [intentions]);

  useEffect(() => {
    handleGetIntentions();
  }, [handleGetIntentions]);

  useEffect(() => {
    let newPaginatedIntentions = [];

    if (intentionsData.length) {
      newPaginatedIntentions = intentionsData.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );

      setPaginatedIntentions(newPaginatedIntentions);
    } else {
      const newPaginatedIntentions = [];
      setPaginatedIntentions(newPaginatedIntentions);
    }
  }, [intentionsData, startIndex, paginatedIntentions]);

  useEffect(() => {
    const newIndex = (pageNumber - 1) * PAGE_SIZE;

    setStartIndex(newIndex);
  }, [pageNumber, startIndex]);

  return {
    fetchingIntentions,
    selectedPeriod,
    paginatedIntentions,
    count,
    updatePageNumber,
    pageNumber,
  };
};
