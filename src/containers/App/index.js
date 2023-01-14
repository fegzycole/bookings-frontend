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
import Dashboard from "../Dashboard";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteWithLayout>
            <InitialBooking />
          </RouteWithLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AccessLayout>
            <Signup />
          </AccessLayout>
        }
      />
      <Route
        path="/signin"
        element={
          <AccessLayout>
            <SignIn />
          </AccessLayout>
        }
      />
      <Route
        path="/forgotPassword"
        element={
          <AccessLayout>
            <ForgotPassword />
          </AccessLayout>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/checkout"
        element={
          <RouteWithLayout>
            <Checkout />
          </RouteWithLayout>
        }
      />
      <Route
        path="/confirmation"
        element={
          <RouteWithLayout>
            <Confirmation />
          </RouteWithLayout>
        }
      />
      <Route
        path="*"
        element={
          <RouteWithLayout>
            <NotFound />
          </RouteWithLayout>
        }
      />
    </Routes>
  );
};

export default App;
