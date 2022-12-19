import { useRouter } from 'next/router';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import RecordsDetail from 'components/records/RecordDetail/RecordsDetail';
import { IIdeas } from 'types/Ideas';
import { useFetcher } from 'customHooks/useFetcher';


const Records = () => {
  const router = useRouter();
  const url = `/ideas/session/${router.query.id}`
  const { data: ideaRecord, loading } = useFetcher<IIdeas>({url, initialState: undefined})
  
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        {ideaRecord && <RecordsDetail ideaRecord={ideaRecord} loading={loading}  />}
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  )
}

export default Records;