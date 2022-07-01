import dynamic from 'next/dynamic';
import { ExerciseProfileProvider } from 'context/exerciseContext';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardLayoutWrapper from 'components/Layout/DashboardLayoutWrapper';
const ExerciseMain = dynamic(() => import('components/exercise/ExerciseMain'), {ssr:false});

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