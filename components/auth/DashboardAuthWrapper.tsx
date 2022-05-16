import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { isAuth, currAuthUser } from 'utils/auth';
import LoginRequired from 'components/auth/LoginRequired';

const DashboardAuthWrapper = ({ children }) => {
  const router = useRouter();
  if (!router.isReady) return <Spin tip="Loading..."/>;
  if (!isAuth()) return <LoginRequired />;
  return (
    <>
      {children}
    </>
  )
};

export default DashboardAuthWrapper;