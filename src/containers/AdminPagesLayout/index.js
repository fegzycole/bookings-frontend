import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwt from "jwt-decode";
import ReginaPacisLogo from "../../images/reginapacis.png";
import DashboardIcon from "../../images/dashboard.svg";
import MassBookings from "../../images/massBookings.svg";
import Settings from "../../images/settings.svg";
import Logout from "../../images/logout.svg";
import CreateBooking from "../../images/create.svg";
import { useInterval } from "../../hooks/useInterval";
import { logoutUser } from "../../store/user/actions";
import { useDispatch } from "react-redux";

const adminLinks = [
  {
    imgUrl: DashboardIcon,
    text: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    imgUrl: CreateBooking,
    text: "Create Booking",
    to: "/admin/createBooking",
  },
  {
    imgUrl: MassBookings,
    text: "Mass Bookings",
    to: "/admin/massBookings",
  },
  {
    imgUrl: Settings,
    text: "Settings",
    to: "/admin/settings",
  },
];

const AdminPagesLayout = ({ children, helperText, title }) => {
  const accessToken = localStorage.getItem("admin-access-token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/signin");
    }
  }, [accessToken, navigate]);

  useInterval(() => {
    const token = localStorage.getItem("admin-access-token");
    const decodedToken = jwt(token);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      dispatch(logoutUser());
    }
  }, 30_000);

  return (
    <div className="flex relative">
      <div className="bg-customYellow-300 min-h-[100vh] h-full w-[280px] p-5 absolute left-0 top-0 z-50">
        <div className="h-[90vh] flex flex-col justify-between">
          <div>
            <div className="flex flex-col relative z-40 text-center pb-10">
              <img
                src={ReginaPacisLogo}
                alt="regina pacis logo"
                className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px] mx-auto"
              />
              <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                Regina Pacis Catholic Church
              </h6>
              <h6 className="font-Museo text-base lg:text-xs text-customGreen-100 font-medium">
                REGINA PACIS
              </h6>
            </div>
            <div>
              {adminLinks.map((adminLink) => (
                <Link
                  to={adminLink.to}
                  key={adminLink.text}
                  className="flex items-start mb-10"
                >
                  <img
                    src={adminLink.imgUrl}
                    alt={adminLink.text}
                    className="mr-3 pt-[2px]"
                  />
                  <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                    {adminLink.text}
                  </h6>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <button>
              <div className="flex">
                <img src={Logout} alt="Logout" className="mr-3" />
                <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                  Logout
                </h6>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%_-_280px)] bg-customGray-300 p-5 font-Museo relative ml-[280px] min-h-[100vh]">
        <header className="absolute bg-white top-0 left-0 w-full p-5">
          <h2 className="text-2xl text-customBlack-200">{title}</h2>
          {helperText && (
            <h6 className="text-sm text-customBlack-200">{helperText}</h6>
          )}
        </header>
        <div className="pt-[120px]">{children}</div>
      </div>
    </div>
  );
};

export default AdminPagesLayout;
