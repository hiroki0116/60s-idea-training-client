import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardWrapper from 'components/Layout/DashboardWrapper'
import { IIdeas } from 'types/Ideas';
import { APIWithoutAuth } from 'utils/api';
const RecordsDetail = dynamic(() => import('components/records/RecordDetail/RecordsDetail'), {ssr:true});


const Records = ({ideaRecord}:{ideaRecord:IIdeas}) => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <RecordsDetail ideaRecord={ideaRecord} />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

Records.getInitialProps = async ({ query }) => {
    try {
      const res = await APIWithoutAuth.get(`/ideas/session/${query.id}`);
      return { ideaRecord: res.data };
    } catch (error) {
      return { ideaRecord: null };
    }
  };

export default Records;