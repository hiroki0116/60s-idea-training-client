import router from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { AuthContext } from "features/auth/stores/context/authContext";
//Third Party
import Avatar from "antd/lib/avatar";
import AppstoreFilled from "@ant-design/icons/AppstoreFilled";
import LogoutOutlined from "@ant-design/icons/LoginOutlined";
import FireFilled from "@ant-design/icons/FireFilled";
import SignalFilled from "@ant-design/icons/SignalFilled";
import SettingFilled from "@ant-design/icons/SettingFilled";
//Utils
import { isAuth } from "utils/auth_functions";
import { capitalizeFirst } from "utils/formatter";
import { handleLogout } from "utils/auth_functions";
//Components
import LoginRequired from "features/auth/components/LoginRequired";
import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});

const DashboardLayoutWrapper = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const customCss = "text-3xl mb-1";
  const options = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <AppstoreFilled className={customCss} />,
    },
    {
      href: "/exercise",
      label: "Exercise",
      icon: <FireFilled className={customCss} />,
    },
    {
      href: "/records",
      label: "Records",
      icon: <SignalFilled className={customCss} />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <SettingFilled className={customCss} />,
    },
  ];

  if (!user) return <CenterSpin />;
  if (!isAuth()) return <LoginRequired />;
  return (
    <div className="grid md:grid-cols-7 grid-cols-1 w-full gap-6 p-5 bg-slate-100 dark:bg-slate-900 dark:text-green-500 min-h-screen">
      <div>
        <div className="place-items-stretch shadow-lg p-2 rounded-lg bg-white md:block hidden  dark:bg-slate-800">
          <div className="text-center py-2">
            <div className="flex justify-center">
              {user?.images?.length && user?.images[0]?.url ? (
                <Avatar src={user?.images[0]?.url} size={60} />
              ) : (
                <Avatar style={{ backgroundColor: "#f15927" }} size={50}>
                  {user?.firstName?.charAt(0)}
                </Avatar>
              )}
            </div>
            <div className="font-bold text-gray-500 text-base mt-2">
              Welcome, {capitalizeFirst(user?.firstName || "")}!
            </div>
          </div>
        </div>

        <div className="md:grid grid-cols-1 place-items-stretch rounded-lg bg-white shadow-lg mt-6 p-3 text-gray-400 sticky top-10 dark:bg-slate-800 hidden  ">
          {options.map((option, i) => {
            const style = `w-full rounded-lg transition duration-500 ease-in-out text-gray-500 hover:text-gray-800 hover:bg-blue-50 transform hover:-translate-y-1 mx-auto my-2 p-2 hover:scale-110 ${
              router.pathname === option.href && "bg-blue-50 text-gray-800"
            }`;
            return (
              <div key={i}>
                {i === 0 && (
                  <div className="text-center text-base py-1 bg-gray-200 rounded-lg mb-2 font-bold dark:bg-slate-900">
                    <div className="">Menu</div>
                  </div>
                )}
                <div className={style}>
                  <Link
                    href={option.href}
                    className={`m-auto w-full ${
                      router.pathname === option.href &&
                      "font-bold text-lg text-gray-800 dark:text-green-600"
                    }`}
                  >
                    <div className="text-center">{option.icon}</div>
                    <div className="text-sm text-center">{option.label}</div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="w-full rounded-lg transition duration-500 ease-in-out text-gray-500 hover:text-gray-800 hover:bg-blue-50 transform hover:-translate-y-1 mx-auto my-2 p-2 hover:scale-110">
            <div className="grid grid-cols-1 justify-items-center">
              <LogoutOutlined
                className={customCss}
                onClick={() => {
                  setUser(null);
                  handleLogout();
                }}
              />
              <div className="text-sm">Logout</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:col-span-6 col-span-7 w-full">
        <Header pathname={router.pathname} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
