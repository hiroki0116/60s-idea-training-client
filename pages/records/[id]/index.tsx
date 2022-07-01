import dynamic from 'next/dynamic'
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper'
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import { IIdeas } from 'types/Ideas';
import { APIWithoutAuth } from 'utils/api';
const RecordsDetail = dynamic(() => import('components/records/RecordDetail/RecordsDetail'), {ssr:true});


const Records = ({ideaRecord}:{ideaRecord:IIdeas}) => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <RecordsDetail ideaRecord={ideaRecord} />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  )
}

export async function getServerSideProps ({ query }){
    try {
      const res = await APIWithoutAuth.get(`/ideas/session/${query.id}`);
      return { props: {ideaRecord: res.data }};
    } catch (error) {
      return { props: {ideaRecord: null }};
    }
  };

export default Records;