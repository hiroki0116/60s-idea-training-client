import dynamic from 'next/dynamic';
import { ExerciseProfileProvider } from 'context/exerciseContext';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardWrapper from 'components/Layout/DashboardWrapper';
const ExerciseMain = dynamic(() => import('components/exercise/ExerciseMain'), {ssr:false});

const exersize = () => {
  return (
    <ExerciseProfileProvider>
      <DashboardWrapper>
        <DashboardAuthWrapper>
          <ExerciseMain />
        </DashboardAuthWrapper>
      </DashboardWrapper>
    </ExerciseProfileProvider>
  )
}

export default exersize;