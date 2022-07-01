import React from 'react';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import SettingMain from 'components/setting/SettingMain';

const settings = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <SettingMain />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  )
}

export default settings;