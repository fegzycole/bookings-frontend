import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import ReginaPacisLogo from "../../images/reginapacis.png";
import DashboardIcon from "../../images/dashboard.svg";
import MassBookings from "../../images/massBookings.svg";
import Settings from "../../images/settings.svg";
import ManagePayments from "../../images/managePayments.svg";
import Logout from "../../images/logout.svg";
import CreateBooking from "../../images/create.svg";
import { useInterval } from "../../hooks/useInterval";
import { Modal } from "../../components/Dialog";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/user/slice";
import { ADMIN_ACCESS_TOKEN } from "../../helpers";

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
    imgUrl: ManagePayments,
    text: "Manage Payments",
    to: "/admin/managePayments",
  },
  {
    imgUrl: Settings,
    text: "Settings",
    to: "/admin/settings",
  },
];

const AdminPagesLayout = ({ children, helperText, title }) => {
  const accessToken = localStorage.getItem(ADMIN_ACCESS_TOKEN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  // const [selectedLink, setSelectedLink]

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(resetUser());

    localStorage.removeItem(ADMIN_ACCESS_TOKEN);

    setOpenModal(false);
  };

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setShowNav((prev) => !prev);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/signin");
    }
  }, [accessToken, navigate]);

  // useEffect(() => {
  //   if (location.pathname === BASE_ADMIN_URL) {
  //     navigate(`${BASE_ADMIN_URL}/signin`);
  //   }
  // }, [navigate, location]);

  useInterval(() => {
    const decodedToken = jwt(accessToken);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      handleLogout();
    }
  }, 1000);

  return (
    <div className="lg:flex relative">
      <Modal
        open={openModal}
        handleClose={toggleModal}
        handleLogout={handleLogout}
      />
      <div className="flex justify-between w-full lg:hidden p-5 pb-0">
        <img
          src={ReginaPacisLogo}
          alt="regina pacis logo"
          className="w-[34px]  h-[34px]"
        />
        <IconButton onClick={toggleNav} edge="end">
          <Menu />
        </IconButton>
      </div>
      <div
        className={`bg-customYellow-300 min-h-[100vh] h-full w-[280px] p-5 absolute left-0 top-0 z-50 ${
          showNav ? "block" : "hidden"
        } lg:block`}
      >
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
              {adminLinks.map((adminLink) => {
                const activePath = location.pathname === adminLink.to;
                return (
                  <button
                    onClick={() => handleNavClick(adminLink.to)}
                    className={`flex items-start mb-10 w-full ${
                      activePath ? "border-l-[3px] border-customGreen-100" : ""
                    }`}
                    key={adminLink.to}
                  >
                    <img
                      src={adminLink.imgUrl}
                      alt={adminLink.text}
                      className={`${activePath ? "ml-3" : ""} mr-3 pt-[2px]`}
                    />
                    <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                      {adminLink.text}
                    </h6>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <button onClick={toggleModal}>
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
      <div className="w-full lg:w-[calc(100%_-_280px)] bg-customGray-300 p-5 font-Museo relative lg:ml-[280px] min-h-[100vh]">
        <header className="absolute bg-white top-0 left-0 w-full p-5">
          <h2 className="text-base lg:text-2xl text-customBlack-200">
            {title}
          </h2>
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
