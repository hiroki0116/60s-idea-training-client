import dynamic from 'next/dynamic';
import DashboardAuthWrapper from 'components/auth/DashboardAuthWrapper';
import DashboardWrapper from 'components/Layout/DashboardWrapper';
const ExerciseMain = dynamic(() => import('components/exercise/ExerciseMain'), {ssr:false});

const exersize = () => {
  return (
    <DashboardWrapper>
      <DashboardAuthWrapper>
        <ExerciseMain />
      </DashboardAuthWrapper>
    </DashboardWrapper>
  )
}

export default exersize;