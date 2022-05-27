import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const RecordChart = dynamic(()=> import('components/dashboard/RecordChart'),{ssr:false})
const HeadCards = dynamic(()=> import('components/dashboard/HeadCards'),{ssr:false})

const dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <HeadCards />
        <RecordChart />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default dashboard