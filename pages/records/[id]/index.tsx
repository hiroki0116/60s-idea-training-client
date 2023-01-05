import { useRouter } from 'next/router';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import RecordsDetail from 'components/records/RecordDetail/RecordsDetail';
import { IIdeas } from 'types/Ideas';
import { useFetcher } from 'customHooks/useFetcher';

type IIdeaRecord = { data: IIdeas };

const Records = () => {
  const router = useRouter();
  const url = `/ideas/${router?.query?.id}`
  const { data: ideaRecord, loading } = useFetcher<IIdeaRecord>({url, initialState: undefined})
  
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        {ideaRecord?.data && <RecordsDetail ideaRecord={ideaRecord.data} loading={loading}  />}
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  )
}

export default Records;