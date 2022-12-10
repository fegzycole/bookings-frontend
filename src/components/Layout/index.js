import React from "react";

import Header from "./Header";
import TopSection from "./Footer/TopSection";
import BottomSection from "./Footer/BottomSection";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="lg:w-[90%] lg:mx-auto">
        <div>{children}</div>
        <TopSection />
      </div>

      <BottomSection />
    </div>
  );
};

export default Layout;
