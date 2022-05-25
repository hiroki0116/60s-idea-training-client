import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const RecordChart = dynamic(()=> import('components/charts/RecordChart'),{ssr:false})

const dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <RecordChart />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default dashboard