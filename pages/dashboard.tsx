import React from 'react'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
      <div>Page contents</div>
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default dashboard