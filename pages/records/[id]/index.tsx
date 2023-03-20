import dynamic from "next/dynamic";
import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import RecordsDetail from "features/records/components/recordDetail/RecordsDetail";
import { useFetchRecord } from "features/records/hooks/useFetchRecord";
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});

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
