import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'

const records = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <p>record content</p>
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default records