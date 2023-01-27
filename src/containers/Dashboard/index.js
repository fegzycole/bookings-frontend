import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import { adminFilterOptions } from "../../helpers";
import Loader from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";
import AppPagination from "../../components/Pagination";
import { useDashboard } from "./useDashboard";
import Dropdown from "../../components/Dropdown";

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
  } = useDashboard();

  if (fetchingIntentions) {
    return <Loader open />;
  }

  return (
    <div className="relative font-Museo">
      <div className="flex w-[100%] justify-between pb-10 items-center">
        <div className="w-[70%]">
          <SearchBar />
        </div>
        <ExportButton
          text="Export Mass Intentions"
          handleClick={() => handleExportToExcel(intentionsData)}
        />
      </div>
      <div className="flex items-center mb-10">
        <h6 className="mr-5 text-customBlue-200 font-Museo">
          Filter mass booking
        </h6>
        <Dropdown
          dropdownItems={adminFilterOptions}
          selectedValue={selectedPeriod}
        />
        <div className="w-[160px] ml-5 relative">
          <p className="absolute w-full left-0 top-[-20px] text-sm text-customGray-100">
            Start Date
          </p>
          <DatePicker addBorder="true" />
        </div>
        <div className="w-[160px] ml-5 relative">
          <p className="absolute w-full left-0 top-[-20px] text-sm text-customGray-100">
            End Date
          </p>
          <DatePicker addBorder="true" />
        </div>
      </div>
      <div>
        <IntentionsTable intentions={paginatedIntentions} />
      </div>

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
