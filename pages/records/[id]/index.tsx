import { useRouter } from "next/router";
import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import RecordsDetail from "features/records/components/recordDetail/RecordsDetail";
import { IIdeas } from "types/Ideas";
import { useFetcher } from "hooks/useFetcher";
import CenterSpin from "components/elements/CenterSpin";

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
