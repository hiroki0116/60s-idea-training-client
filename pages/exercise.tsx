import { ExerciseProfileProvider } from 'context/exerciseContext';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
import ExerciseMain from 'components/exercise/ExerciseMain';

const exersize = () => {
  return (
    <ExerciseProfileProvider>
      <DashboardLayoutWrapper>
        <DashboardAuthWrapper>
          <ExerciseMain />
        </DashboardAuthWrapper>
      </DashboardLayoutWrapper>
    </ExerciseProfileProvider>
  )
}

export default exersize;