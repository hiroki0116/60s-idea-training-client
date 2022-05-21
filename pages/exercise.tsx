import React from 'react'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const exersize = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
      <div>Trainings contents</div>
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default exersize;