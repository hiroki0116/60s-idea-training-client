import { useState,useContext } from "react";
import { AuthContext } from 'context/authContext';
import Link from "next/link";
import { Menu, Divider } from "antd";
import { useRouter } from "next/router";
import Image from 'next/image';
import { LOGO_IMAGE } from "utils/constants";
import { AppstoreFilled, LogoutOutlined,FireFilled,SignalFilled,SettingFilled } from "@ant-design/icons";
import { handleLogout } from "utils/auth";

const Sidenav = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const selectedStyle = 'font-bold border-r-4 bg-blue-50';
  
  return (
    <>
      <div className="h-10 p-2">
        <Link href='/dashboard'>
          <a>
            <Image src={LOGO_IMAGE} width={200} height={50} alt='CompanyLogo' />
          </a>
        </Link>
      </div>
      <Divider key={Math.random()}/>
      <Menu 
        theme="light"
      >
        <Menu.Item 
          key="1"
          className = {router.pathname === '/dashboard' && selectedStyle}
        >
            <Link href={'/dashboard'}><a><AppstoreFilled style={{fontSize:'1.25rem',verticalAlign:'middle'}}/>Dashboard</a></Link>
        </Menu.Item>
        <Menu.Item 
          key="2"
          className = {router.pathname === '/exercise' && selectedStyle}
        >
            <Link href={'/exercise'}><a><FireFilled style={{fontSize:'1.25rem',verticalAlign:'middle'}}/>Exercise</a></Link>
        </Menu.Item>
        <Menu.Item 
          key="3"
          className = {router.pathname === '/records' && selectedStyle}
        >
            <Link href={'/records'}><a><SignalFilled style={{fontSize:'1.25rem',verticalAlign:'middle'}}/>Records</a></Link>
        </Menu.Item>
        <Menu.Item 
          key="4"
          className = {router.pathname === '/settings' && selectedStyle}
        >
            <Link href={'/settings'}><a><SettingFilled style={{fontSize:'1.25rem',verticalAlign:'middle'}}/>Settings</a></Link>
        </Menu.Item>
        <Menu.Divider key={Math.random()}/>
        <Menu.Item 
          key="5"
          className='font-bold'
          onClick={()=>handleLogout(setUser)}
        >
            <span><LogoutOutlined style={{fontSize:'1.25rem',verticalAlign:'middle'}}/></span>
            <span>Logout</span>
        </Menu.Item>
      </Menu>

      <div
        className="w-40 h-24 text-white absolute left-2 bottom-32 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-2xl text-center pt-5"
      >
        <p>Need Help?</p>
        <p>Please check our docs</p>
      </div>
    </>
  );
}

export default Sidenav;
