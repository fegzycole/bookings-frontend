import { useCallback, useEffect, useState } from "react";
import Excel from "exceljs";
import saveAs from "file-saver";
import {
  formatTime,
  getCount,
  getErrorMessage,
  getFileName,
  stringifySnackBarProps,
} from "../../helpers";
import { getIntentions } from "../../store/apiBookings/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setFetchingIntentions } from "../../store/apiBookings/slice";

const PAGE_SIZE = 8;

const defaultPeriod = "month";

export const useDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [paginatedIntentions, setPaginatedIntentions] = useState([]);
  const [intentionsData, setIntentionsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState("");
  const [usedPeriod, setUsedPeriod] = useState();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { intentions, fetchingIntentions } = useSelector(
    (state) => state.apiBookings
  );

  const updatePageNumber = (_e, pageNo) => {
    setPageNumber(pageNo);
  };

  const handleDateChange = (type) => (newDate) => {
    if (type === "startDate") {
      setStartDate(newDate);
      setEndDate(null);
    } else {
      setEndDate(newDate);
    }
  };

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;

    setSelectedPeriod(newValue);
    setStartDate(null);
    setEndDate(null);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  useEffect(() => {
    if (selectedPeriod) {
      setUsedPeriod(`?type=${selectedPeriod}`);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (![startDate, endDate].includes(null)) {
      setSelectedPeriod("");

      const format = "DD-MM-YYYY";

      const normalizedStartDate = formatTime(startDate, format);
      const normalizedEndDate = formatTime(endDate, format);

      setUsedPeriod(
        `?startDate=${normalizedStartDate}&endDate=${normalizedEndDate}`
      );
    }
  }, [startDate, endDate]);

  const count = getCount(intentionsData.length, PAGE_SIZE);

  const handleGetIntentions = useCallback(async () => {
    if (usedPeriod) {
      try {
        dispatch(setFetchingIntentions(true));

        await dispatch(getIntentions(usedPeriod));

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
    }
  }, [dispatch, enqueueSnackbar, usedPeriod]);

  const handleExportToExcel = async (intentions) => {
    const normalizedIntentions = intentions.map((intention) => ({
      ...intention,
      startDate: formatTime(intention.startDate),
      endDate: formatTime(intention.endDate),
    }));
    try {
      const workbook = new Excel.Workbook();
      const fileName = getFileName();
      const worksheet = workbook.addWorksheet("Mass Bookings");

      const intentionsColumns = [
        { key: "bookedBy", header: "Intention Booked By" },
        { key: "name", header: "Intention For" },
        { key: "startDate", header: "Start Date" },
        { key: "endDate", header: "End Date" },
        { key: "amountPaid", header: "Amount" },
        { key: "massIntention", header: "Mass Intention" },
      ];

      worksheet.columns = intentionsColumns;

      normalizedIntentions.forEach((intention) => {
        worksheet.addRow(intention);
      });

      worksheet.columns.forEach((sheetColumn) => {
        sheetColumn.font = {
          size: 12,
        };
        sheetColumn.width = 30;
      });

      worksheet.getRow(1).font = {
        bold: true,
        size: 13,
      };

      const buffer = await workbook.xlsx.writeBuffer();

      await saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${fileName}.xlsx`
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to export to excel, please retry",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

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
    handleExportToExcel,
    intentionsData,
    handleDropdownChange,
    startDate,
    endDate,
    handleDateChange,
    search,
    handleInputChange,
  };
};
