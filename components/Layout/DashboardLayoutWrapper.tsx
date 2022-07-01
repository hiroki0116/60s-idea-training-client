import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import Link from 'next/link';
import router from 'next/router';
//Third Party
import { Avatar } from 'antd';
import { AppstoreFilled, LogoutOutlined,FireFilled,SignalFilled,SettingFilled } from "@ant-design/icons";
//Utils
import { currAuthUser } from 'utils/auth';
import { capitalizeFirst } from 'utils/formatter';
import { handleLogout } from "utils/auth";
import { IUser } from 'types/User';
import CenterSpin from './CenterSpin';
//Components
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import SignUpOrLogin from 'components/auth/SignUpOrLogin';


const DashboardLayoutWrapper = ({children}) => {
  const user: IUser = currAuthUser();
  const { setUser } = useContext(AuthContext);
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
    

  return (
    <div className="grid grid-cols-7 gap-6 p-5 bg-slate-100 min-h-screen">
        <div className="">
          <div className="place-items-stretch shadow-lg p-2 rounded-lg bg-white">
            <div className="text-center py-2">
              <div>
                {user?.images[0]?.url ? (
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

          <div className="grid grid-cols-1 place-items-stretch rounded-lg bg-white shadow-lg mt-6 p-3 text-gray-400 sticky top-10">
            {options.map((option, i) => {
              const style = `w-full rounded-lg transition duration-500 ease-in-out text-gray-500 hover:text-gray-800 hover:bg-blue-50 transform hover:-translate-y-1 mx-auto my-2 p-2 hover:scale-110 ${router.pathname === option.href && 'bg-blue-50 text-gray-800'}`;
              return (
                <div key={i}>
                  {i === 0 && (
                    <div className="text-center text-base py-1 bg-gray-200 rounded-lg mb-2 font-bold ">
                      <div className="">Menu</div>
                    </div>
                  )}
                    <div className={style}>
                        <Link href={option.href}>
                            <button className={`m-auto w-full ${router.pathname === option.href  && 'font-bold text-lg text-gray-800'}`}>
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

      <div className="col-span-6 w-full">
        <Header pathname={router.pathname}/>
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayoutWrapper