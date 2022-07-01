import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
const RecordsMain = dynamic(() => import('components/records/RecordsMain/RecordsMain'), {ssr:false});


const records = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <RecordsMain />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  )
}

export default records