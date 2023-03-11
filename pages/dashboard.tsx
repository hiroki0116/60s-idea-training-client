import dynamic from "next/dynamic";
import DashboardAuthWrapper from "components/auth/DashboardAuthWrapper";
import DashboardLayoutWrapper from "components/layout/DashboardLayoutWrapper";
import HeadCards from "components/dashboard/HeadCards";
const RecordChart = dynamic(() => import("components/dashboard/RecordChart"), {
  ssr: false,
});

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
