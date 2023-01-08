import { useState,useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import Link from 'next/link';
import router from 'next/router';
//Third Party
import { Avatar } from 'antd';
import { AppstoreFilled, LogoutOutlined,FireFilled,SignalFilled,SettingFilled } from "@ant-design/icons";
//Utils
import { currAuthUser, isAuth } from 'utils/auth';
import { capitalizeFirst } from 'utils/formatter';
import { handleLogout } from "utils/auth";
import { IUser } from 'types/User';
//Components
import LoginRequired from 'components/auth/LoginRequired';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import CenterSpin from './CenterSpin';


const DashboardLayoutWrapper = ({children}) => {
  const [user, setUserInfo] = useState<IUser | undefined>(undefined);
  const { setUser } = useContext(AuthContext);

  useEffect(()=>{
    setUserInfo(currAuthUser())
  },[])

  if (!isAuth()) return <LoginRequired />;

    const customCss = 'text-3xl mb-1';
    const options = [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: <AppstoreFilled className={customCss} />
        },
        {
          href: '/exercise',
          label: 'Exercise',
          icon: <FireFilled className={customCss} />
        },
        {
          href: '/records',
          label: 'Records',
          icon: <SignalFilled className={customCss} />
        },
        {
          href: '/settings',
          label: 'Settings',
          icon: <SettingFilled className={customCss} />,
        }
      ];

  return user ? (
    <div className="grid sm:grid-cols-7 grid-cols-1 w-full gap-6 p-5 bg-slate-100 dark:bg-slate-900 dark:text-green-500 min-h-screen">
        <div>
          <div className="place-items-stretch shadow-lg p-2 rounded-lg bg-white sm:block hidden  dark:bg-slate-800">
            <div className="text-center py-2">
              <div>
                {user?.images?.length && user?.images[0]?.url ? (
                  <Avatar src={user?.images[0]?.url} size={60}/>
                ) : (
                  <Avatar style={{ backgroundColor: '#f15927' }} size={50}>
                    {user?.firstName?.charAt(0)}
                  </Avatar>
                )}
              </div>
              <div className="font-bold text-gray-500 text-base mt-2">
                Welcome, {capitalizeFirst(user?.firstName)}!
              </div>
            </div>
          </div>

          <div className="sm:grid grid-cols-1 place-items-stretch rounded-lg bg-white shadow-lg mt-6 p-3 text-gray-400 sticky top-10 hidden  dark:bg-slate-800">
            {options.map((option, i) => {
              const style = `w-full rounded-lg transition duration-500 ease-in-out text-gray-500 hover:text-gray-800 hover:bg-blue-50 transform hover:-translate-y-1 mx-auto my-2 p-2 hover:scale-110 ${router.pathname === option.href && 'bg-blue-50 text-gray-800'}`;
              return (
                <div key={i}>
                  {i === 0 && (
                    <div className="text-center text-base py-1 bg-gray-200 rounded-lg mb-2 font-bold dark:bg-slate-900">
                      <div className="">Menu</div>
                    </div>
                  )}
                    <div className={style}>
                        <Link href={option.href}>
                            <button className={`m-auto w-full ${router.pathname === option.href  && 'font-bold text-lg text-gray-800 dark:text-green-600'}`}>
                                {option.icon}
                                <div className='text-sm'>
                                    {option.label}
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
              );
            })}
            <div className="w-full rounded-lg transition duration-500 ease-in-out text-gray-500 hover:text-gray-800 hover:bg-blue-50 transform hover:-translate-y-1 mx-auto my-2 p-2 hover:scale-110">
                <button className="m-auto w-full">
                    <LogoutOutlined className={customCss} onClick={()=>handleLogout(setUser)}/>
                    <div className='text-sm'>
                        Logout
                    </div>
                </button>
            </div>

          </div>
      </div>

      <div className="sm:col-span-6 col-span-7 w-full">
        <Header pathname={router.pathname}/>
        {children}
        <Footer />
      </div>
    </div>
  ): <CenterSpin />
}

export default DashboardLayoutWrapper