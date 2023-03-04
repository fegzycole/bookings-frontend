import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "../Checkout";
import InitialBooking from "../InitialBooking";
import Confirmation from "../Confirmation";
import NotFound from "../../components/NotFound";
import Signup from "../Signup";
import RouteWithLayout from "../RouteWithLayout";
import AccessLayout from "../AccessLayout";
import SignIn from "../SignIn";
import ForgotPassword from "../ForgotPassword";
import MassBookings from "../MassBookings";
import ResetPassword from "../ResetPassword";
import Admin from "../Admin/Admin";
import AdminPagesLayout from "../AdminPagesLayout";
import MassBooking from "../MassBooking";
import Settings from "../Settings";
import AdminInitialBooking from "../AdminCreateBooking/InitialBooking";
import AdminCheckout from "../AdminCreateBooking/Checkout";
import Dashboard from "../Dashboard";
import ManagePayments from "../ManagePayments";

const App = () => {
  return (
    <div className="3xl:w-[50%] 3xl:mx-auto">
      <Routes>
        <Route
          index
          element={
            <RouteWithLayout>
              <InitialBooking />
            </RouteWithLayout>
          }
        />
        <Route
          path="checkout"
          element={
            <RouteWithLayout>
              <Checkout />
            </RouteWithLayout>
          }
        />
        <Route
          path="confirmation"
          element={
            <RouteWithLayout>
              <Confirmation />
            </RouteWithLayout>
          }
        />
        <Route path="admin" element={<Admin />}>
          <Route
            path="signup"
            element={
              <AccessLayout>
                <Signup />
              </AccessLayout>
            }
          />
          <Route
            path="signin"
            element={
              <AccessLayout>
                <SignIn />
              </AccessLayout>
            }
          />
          <Route
            path="forgotPassword"
            element={
              <AccessLayout>
                <ForgotPassword />
              </AccessLayout>
            }
          />
          <Route
            path="resetPassword"
            element={
              <AccessLayout>
                <ResetPassword />
              </AccessLayout>
            }
          />
          <Route
            path="massBookings"
            element={
              <AdminPagesLayout
                title="Mass Bookings"
                helperText="Keep track of all the mass booking."
              >
                <MassBookings />
              </AdminPagesLayout>
            }
          />
          <Route
            path="massBookings/:id"
            element={
              <AdminPagesLayout
                title="Mass Bookings"
                helperText="Keep track of all the mass booking."
              >
                <MassBooking />
              </AdminPagesLayout>
            }
          />

          <Route
            path="settings"
            element={
              <AdminPagesLayout title="Admin Settings">
                <Settings />
              </AdminPagesLayout>
            }
          />

          <Route
            path="createBooking"
            element={
              <AdminPagesLayout title="Create Booking">
                <AdminInitialBooking />
              </AdminPagesLayout>
            }
          />

          <Route
            path="createBooking/save"
            element={
              <AdminPagesLayout title="Create Booking">
                <AdminCheckout />
              </AdminPagesLayout>
            }
          />

          <Route
            path="dashboard"
            element={
              <AdminPagesLayout title="Today's Mass Booking Analytics">
                <Dashboard />
              </AdminPagesLayout>
            }
          />

          <Route
            path="managePayments"
            element={
              <AdminPagesLayout title="Manage Payments">
                <ManagePayments />
              </AdminPagesLayout>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <RouteWithLayout>
              <NotFound />
            </RouteWithLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
