import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import { adminFilterOptions } from "../../helpers";
import { AdminPageLoader } from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";
import AppPagination from "../../components/Pagination";
import { useDashboard } from "./useDashboard";
import Dropdown from "../../components/Dropdown";
import NoIntentions from "../../components/NoIntentions";

const Dashboard = () => {
  const {
    fetchingIntentions,
    selectedPeriod,
    paginatedIntentions,
    count,
    updatePageNumber,
    pageNumber,
    intentionsData,
    handleExportToExcel,
    handleDropdownChange,
    startDate,
    endDate,
    handleDateChange,
    search,
    handleInputChange,
  } = useDashboard();

  const showIntentionsOrLoader = () => {
    if (fetchingIntentions) {
      return (
        <div className="w-full h-[300px]">
          <AdminPageLoader />
        </div>
      );
    }

    if (!paginatedIntentions.length || !intentionsData) {
      return <NoIntentions />;
    }

    return <IntentionsTable intentions={paginatedIntentions} />;
  };

  return (
    <div className="relative font-Museo">
      <div className="flex w-[100%] justify-between pb-10 items-center">
        <div className="w-[70%]">
          <SearchBar value={search} handleChange={handleInputChange} />
        </div>
        <ExportButton
          text="Export Mass Intentions"
          handleClick={() => handleExportToExcel(intentionsData)}
          disabled={!intentionsData.length}
        />
      </div>
      <div className="flex items-center mb-10">
        <h6 className="mr-5 text-customBlue-200 font-Museo">
          Filter mass booking
        </h6>
        <div className="w-[160px]">
          <Dropdown
            dropdownItems={adminFilterOptions}
            selectedValue={selectedPeriod}
            handleDropdownChange={handleDropdownChange}
          />
        </div>

        <div className="w-[160px] ml-5">
          <DatePicker
            addBorder="true"
            value={startDate}
            placeholder="Start Date"
            handleChange={handleDateChange("startDate")}
          />
        </div>
        <div className="w-[160px] ml-5 ">
          <DatePicker
            addBorder="true"
            value={endDate}
            placeholder="End Date"
            minDate={startDate}
            disabled={startDate === null}
            handleChange={handleDateChange("endDate")}
          />
        </div>
      </div>

      {showIntentionsOrLoader()}

      {count > 0 && (
        <div className="flex justify-end pt-5">
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
