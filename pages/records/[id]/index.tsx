import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import RecordsDetail from "features/records/components/recordDetail/RecordsDetail";
import CenterSpin from "components/elements/CenterSpin";
import { useFetchRecord } from "features/records/hooks/useFetchRecord";

const Records = () => {
  const { loading, ideaRecord } = useFetchRecord();
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        {loading ? <CenterSpin /> : <RecordsDetail ideaRecord={ideaRecord} />}
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  );
};

export default Records;
