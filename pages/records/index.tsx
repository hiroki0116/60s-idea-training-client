import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
const RecordsMain = dynamic(() => import('components/records/RecordsMain/RecordsMain'), {ssr:false});


const records = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <RecordsMain />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default records