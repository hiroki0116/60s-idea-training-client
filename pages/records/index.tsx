import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import RecordsMain from "features/records/components/records/RecordsMain";

const records = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <RecordsMain />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  );
};

export default records;
