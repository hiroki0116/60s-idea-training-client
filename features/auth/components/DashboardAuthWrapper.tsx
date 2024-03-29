import { useRouter } from "next/router";
import Spin from "antd/lib/spin";
import { isAuth } from "utils/auth_functions";
import LoginRequired from "features/auth/components/LoginRequired";

const DashboardAuthWrapper = ({ children }) => {
  const router = useRouter();
  if (!router.isReady) return <Spin tip="Loading..." />;
  if (!isAuth()) return <LoginRequired />;
  return <>{children}</>;
};

export default DashboardAuthWrapper;
