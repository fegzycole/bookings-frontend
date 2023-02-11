import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";
import jwt from "jwt-decode";
import GeneralSettings from "./GeneralSettings";
import SuperAdmin from "./SuperAdmin";
import { ADMIN_ACCESS_TOKEN } from "../../helpers";

export const StyledTab = styled(Tab)`
  font-family: Museo;
  text-transform: capitalize;
  font-size: 18px;
  color: #aaaaaa;

  &.Mui-selected {
    color: #007464;
    border-bottom: 2px solid #007464 !important;
  }
`;

export const StyledTabs = styled(Tabs)`
  text-align: center;

  & .MuiTabs-flexContainer {
    margin-left: auto;
    margin-right: auto;
  }

  & .MuiTabs-indicator {
    display: none;
  }
`;

const Settings = () => {
  const [value, setValue] = React.useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
    const user = jwt(token);

    setIsSuperAdmin(user.isSuperAdmin || false);
  }, []);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-[-50px] px-10">
      {isSuperAdmin && (
        <div className="w-[400px]">
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="General Settings" />
            <StyledTab label="Super Admin Privileges" />
          </StyledTabs>
        </div>
      )}

      <div className="w-[500px] mt-10">
        {value === 0 ? <GeneralSettings /> : <SuperAdmin />}
      </div>
    </div>
  );
};

export default Settings;
