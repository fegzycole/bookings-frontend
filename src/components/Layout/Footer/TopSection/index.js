import React from "react";

import LinkedIn from "../../../../images/linkedIn.svg";
import Instagram from "../../../../images/instagram.svg";
import Twitter from "../../../../images/twitter.svg";
import BoxIcon from "../../../../images/box.svg";
import EmailIcon from "../../../../images/email.svg";
import PhoneIcon from "../../../../images/phone.svg";

import SocialLink from "./SocialLink";
import OfficeInfo from "./OfficeInfo";
import Segment from "./Segment";
import Text from "./Text";
import Link from "./Link";

const TopSection = () => {
  return (
    <div className="mt-5 pt-5 font-Museo lg:flex lg:justify-between">
      <Segment header="Visit Us">
        <Text text="8, Felix Oriarevho Street, Checking Point Bus Stop." />
        <Text text="PEACE ESTATE" />
        <Text text="Lekki-Epe Expressway, Sangotedo, Lagos, Nigeria" />

        <div className="my-5 w-[100px] flex justify-between">
          <SocialLink imgUrl={LinkedIn} alt="LinkedIn" />
          <SocialLink imgUrl={Instagram} alt="Instagram" />
          <SocialLink imgUrl={Twitter} alt="Twitter" />
        </div>
      </Segment>

      <Segment header="USEFUL LINKS">
        <div className="flex flex-col">
          <Link linkPath="www.google.com" linkText="Home" />
          <Link linkPath="www.google.com" linkText="Parish" />
          <Link linkPath="www.google.com" linkText="Activities" />
          <Link linkPath="www.google.com" linkText="Organizations" />
          <Link linkPath="www.google.com" linkText="News" />
          <Link linkPath="www.google.com" linkText="Donate" />
        </div>
      </Segment>

      <Segment header="Office Hours">
        <OfficeInfo imgUrl={BoxIcon} imgAlt="Box">
          <div>
            <Text text="Office Hours:" />
            <Text text="Monday-Friday: 9am-6pm" />
            <Text text="Sundays: 8am-12noon" />
          </div>
        </OfficeInfo>

        <OfficeInfo imgUrl={EmailIcon} imgAlt="Email">
          <Text text="Email: info@reginapaciscc.org" />
        </OfficeInfo>

        <OfficeInfo imgUrl={PhoneIcon} imgAlt="Phone">
          <Text text="Phone: +2348136952196" />
        </OfficeInfo>
      </Segment>
    </div>
  );
};

export default TopSection;
