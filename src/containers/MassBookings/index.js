import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import { adminFilterOptions } from "../../helpers";
import { AdminPageLoader } from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";
import AppPagination from "../../components/Pagination";
import { useMassBookings } from "./useMassBookings";
import Dropdown from "../../components/Dropdown";
import NoIntentions from "../../components/NoIntentions";
import MobileCard from "../../components/MobileCard";

const MassBookings = () => {
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
    handleClick,
  } = useMassBookings();

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

    return (
      <>
        <div className="lg:hidden">
          {paginatedIntentions.map(
            ({ bookedBy, startDate, endDate, amountPaid, id }) => (
              <MobileCard
                bookedBy={bookedBy}
                key={id}
                amountPaid={amountPaid}
                startDate={startDate}
                endDate={endDate}
                handleClick={() => handleClick(id)}
              />
            )
          )}
        </div>
        <div className="hidden lg:block">
          <IntentionsTable
            intentions={paginatedIntentions}
            handleActionClick={handleClick}
          />
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
      </>
    );
  };

  return (
    <div className="relative font-Museo mt-[-30px] lg:mt-0">
      <div className="lg:flex w-[100%] justify-between pb-10 items-center">
        <div className="lg:w-[65%] xl:w-[70%] mb-5 lg:mb-0">
          <SearchBar value={search} handleChange={handleInputChange} />
        </div>
        <ExportButton
          text="Export Mass Intentions"
          handleClick={() => handleExportToExcel(intentionsData)}
          disabled={!intentionsData.length}
        />
      </div>
      <div className="md:flex items-center mb-10">
        <h6 className="mr-5 text-customBlue-200 font-Museo mb-5 md:mb-0">
          Filter mass booking
        </h6>
        <div className="md:w-[160px] mb-5 md:mb-0">
          <Dropdown
            dropdownItems={adminFilterOptions}
            selectedValue={selectedPeriod}
            handleDropdownChange={handleDropdownChange}
          />
        </div>

        <div className="md:w-[160px] md:ml-5 mb-5 md:mb-0">
          <DatePicker
            addBorder="true"
            value={startDate}
            placeholder="Start Date"
            handleChange={handleDateChange("startDate")}
          />
        </div>
        <div className="md:w-[160px] md:ml-5 mb-5 md:mb-0">
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
    </div>
  );
};

export default MassBookings;
