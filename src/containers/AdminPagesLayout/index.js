import ReginaPacisLogo from "../../images/reginapacis.png";
import DashboardIcon from "../../images/dashboard.svg";
import MassBookings from "../../images/massBookings.svg";
import ManagePayments from "../../images/managePayments.svg";
import Settings from "../../images/settings.svg";
import Logout from "../../images/logout.svg";
import { Link } from "react-router-dom";

const adminLinks = [
  {
    imgUrl: DashboardIcon,
    text: "Dashboard",
    to: "/admin/dashboard",
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

const AdminPagesLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-customYellow-300 h-[100vh] w-[280px] p-5 flex flex-col justify-between">
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
      <div className="w-[calc(100%_-_280px)]">{children}</div>
    </div>
  );
};

export default AdminPagesLayout;
