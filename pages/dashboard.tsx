import dynamic from "next/dynamic";
import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import HeadCards from "features/dashboard/components/HeadCards";
const RecordChart = dynamic(
  () => import("features/dashboard/components/RecordChart"),
  {
    ssr: false,
  }
);

const dashboard = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardAuthWrapper>
        <HeadCards />
        <RecordChart />
      </DashboardAuthWrapper>
    </DashboardLayoutWrapper>
  );
};

export default dashboard;
