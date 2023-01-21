import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import { adminFilterOptions } from "../../helpers";
import Loader from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";
import AppPagination from "../../components/Pagination";
import { useDashboard } from "./useDashboard";

const Dashboard = () => {
  const {
    fetchingIntentions,
    selectedPeriod,
    paginatedIntentions,
    count,
    updatePageNumber,
    pageNumber,
  } = useDashboard();

  if (fetchingIntentions) {
    return <Loader open />;
  }

  return (
    <div className="relative p-10 pt-5 font-Museo">
      <div className="pb-10">
        <h2 className="text-2xl text-customBlack-200">
          Mass Booking Intention
        </h2>
        <h6 className="text-sm text-customBlack-200">
          Keep track of all the mass booking.
        </h6>
      </div>
      <div className="flex w-[100%] justify-between pb-10 items-center">
        <div className="w-[50%]">
          <SearchBar />
        </div>
        <ExportButton text="Export Mass Intension" />
        <div className="w-[15%]">
          <DatePicker addBorder="true" />
        </div>
      </div>
      <div className="flex items-center">
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
        <IntentionsTable intentions={paginatedIntentions} />
      </div>

      {count > 0 && (
        <div className="flex justify-end">
          <AppPagination
            count={count}
            handleChange={updatePageNumber}
            hidePrevButton={pageNumber === 1}
            hideNextButton={pageNumber === count}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
