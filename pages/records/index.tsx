import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import RecordsMain from 'components/records/RecordsMain/RecordsMain';


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