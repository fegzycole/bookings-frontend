import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TotalMassesBooked from "../../images/totalMassesBooked.png";
import DailyMassesBooked from "../../images/dailyMassesBooked.png";
import TrackPayment from "../../images/trackPayment.png";

import { getErrorMessage, stringifySnackBarProps } from "../../helpers";
import { useSnackbar } from "notistack";
import {
  getDashboardStats,
  getMostRecentBookings,
} from "../../store/apiBookings/actions";
import Loader from "../../components/Loader";
import Stat from "./Stat";
import { useNavigate } from "react-router-dom";
import IntentionCard from "./IntentionCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    daily: 0,
    allTime: 0,
  });
  const [latestBookings, setLatestBookings] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      setOpenLoader(true);
      const { daily, allTime } = await getDashboardStats();

      const recentBookings = await getMostRecentBookings();

      setStats({
        daily,
        allTime,
      });
      setLatestBookings(recentBookings);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error occurred while fetching dashboard data",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  }, [enqueueSnackbar]);

  const generateStat = (statCount) => {
    if (statCount > 1000) {
      return `${statCount}+`;
    }

    return statCount.toString();
  };

  const handleClick = () => {
    navigate("/admin/massBookings");
  };

  const handleManagePaymentClick = () => {
    navigate("/admin/managePayments");
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="mt-[-50px] lg:mt-[-30px]">
      <Loader open={openLoader} />
      {!openLoader && (
        <div className="lg:flex gap-x-10">
          <div className="lg:w-[48%]">
            <h6 className="font-Satoshi text-2xl lg:text-4xl mb-5 text-customBlack-200">
              Mass Booking Overview
            </h6>
            <p className="text-base lg:text-lg mb-5 font-light font-Museo">
              Keep track of all the mass booking and payment at a glance.
            </p>
            <div>
              <div className="relative">
                <Stat
                  imgUrl={TotalMassesBooked}
                  imgAlt="Total Masses Bookings"
                  statCount={generateStat(stats.allTime)}
                  handleClick={handleClick}
                />
              </div>
              <div className="lg:flex justify-between">
                <div className="relative lg:w-[48%]">
                  <Stat
                    imgUrl={DailyMassesBooked}
                    imgAlt="Mass Bookings For Today"
                    statCount={generateStat(stats.daily)}
                    handleClick={handleClick}
                    long
                  />
                </div>
                <div className="relative lg:w-[48%]">
                  <Stat
                    imgUrl={TrackPayment}
                    imgAlt="Track Payments"
                    handleClick={handleManagePaymentClick}
                    long
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[45%] p-5 lg:px-10 bg-white">
            <div className="flex justify-between mb-10">
              <h2 className="lg:text-2xl">Mass Booking Intention</h2>
              <Link className="text-customGreen-100" to="/admin/massBookings">
                View all
              </Link>
            </div>
            <div>
              {latestBookings.length ? (
                <div>
                  {latestBookings.map((booking) => (
                    <IntentionCard
                      name={booking.bookedBy}
                      createdAt={booking.createdAt}
                      startDate={booking.startDate}
                      massIntention={booking.massIntention}
                      key={`${booking.massIntention}-${Math.random()}`}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
