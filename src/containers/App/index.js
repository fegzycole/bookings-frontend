import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../components/Layout";
import Checkout from "../Checkout";
import InitialBooking from "../InitialBooking";
import Confirmation from "../Confirmation";

const App = () => {
  return (
    <div className="w-11/12 my-5 mx-auto">
      <Layout>
        <Routes>
          <Route path="/" element={<InitialBooking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
