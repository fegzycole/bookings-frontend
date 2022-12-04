import React from "react";
import InitialBooking from "../../components/InitialBooking";
import Layout from "../../components/Layout";
import BackgroundImage from "../../images/background.png";

const App = () => {
  return (
    <div className="w-11/12 my-5 mx-auto">
      <div className="absolute right-0 top-10 h-full hidden lg:block">
        <img src={BackgroundImage} alt="background" className="w-full h-full" />
      </div>

      <Layout>
        <InitialBooking />
      </Layout>
    </div>
  );
};

export default App;
