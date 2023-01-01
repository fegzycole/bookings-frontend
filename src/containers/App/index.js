import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../components/Layout";
import BackgroundImage from "../../images/background.png";
import Checkout from "../Checkout";
import InitialBooking from "../InitialBooking";
import Confirmation from "../Confirmation";

const App = () => {
  return (
    <div className="w-11/12 my-5 mx-auto">
      <div className="absolute right-0 top-10 h-full hidden lg:block">
        <img src={BackgroundImage} alt="background" className="w-full h-full" />
      </div>

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
