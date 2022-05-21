import React from 'react'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const records = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
      <div>Records contents</div>
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default records