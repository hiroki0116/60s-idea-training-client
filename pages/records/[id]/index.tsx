import { useRouter } from "next/router";
import DashboardAuthWrapper from "components/auth/DashboardAuthWrapper";
import DashboardLayoutWrapper from "components/layout/DashboardLayoutWrapper";
import RecordsDetail from "components/records/RecordDetail/RecordsDetail";
import { IIdeas } from "types/Ideas";
import { useFetcher } from "customHooks/useFetcher";
import CenterSpin from "components/layout/CenterSpin";

const Records = () => {
  const router = useRouter();
  const url = `/ideas/${router?.query?.id}`;
  const { data: ideaRecord, loading } = useFetcher<IIdeas>({
    url,
    initialState: undefined,
  });

  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        {loading ? <CenterSpin /> : <RecordsDetail ideaRecord={ideaRecord} />}
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  );
};

export default Records;
