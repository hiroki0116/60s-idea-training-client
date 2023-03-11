import { ExerciseProfileProvider } from "context/exerciseContext";
import DashboardAuthWrapper from "features/auth/components/DashboardAuthWrapper";
import DashboardLayoutWrapper from "features/dashboard/components/DashboardLayoutWrapper";
import ExerciseMain from "features/exercise/components/ExerciseMain";

const exersize = () => {
  return (
    <ExerciseProfileProvider>
      <DashboardLayoutWrapper>
        <DashboardAuthWrapper>
          <ExerciseMain />
        </DashboardAuthWrapper>
      </DashboardLayoutWrapper>
    </ExerciseProfileProvider>
  );
};

export default exersize;
