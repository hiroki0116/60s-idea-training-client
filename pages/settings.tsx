import React from "react";
import DashboardAuthWrapper from "components/auth/DashboardAuthWrapper";
import DashboardLayoutWrapper from "components/layout/DashboardLayoutWrapper";
import SettingMain from "components/setting/SettingMain";

const settings = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <SettingMain />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  );
};

export default settings;
