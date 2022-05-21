import React from 'react'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const settings = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
      <div>Settings contents</div>
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default settings