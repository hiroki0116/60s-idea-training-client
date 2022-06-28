import React from 'react';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardWrapper from 'components/Layout/DashboardWrapper';
import SettingMain from 'components/setting/SettingMain';

const settings = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <SettingMain />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default settings;