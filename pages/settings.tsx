import React from "react";
import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import SettingMain from "features/settings/components/SettingMain";

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
