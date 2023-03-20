import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
// third parties
import Menu from "antd/lib/menu";
import Divider from "antd/lib/divider";
import AppstoreFilled from "@ant-design/icons/AppstoreFilled";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import FireFilled from "@ant-design/icons/FireFilled";
import SignalFilled from "@ant-design/icons/SignalFilled";
import SettingFilled from "@ant-design/icons/SettingFilled";
// utils
import { LOGO_IMAGE } from "utils/constants";
import { handleLogout } from "utils/auth_functions";
// context
import { AuthContext } from "features/auth/stores/context/authContext";

const Sidenav = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const selectedStyle = "font-bold border-r-4 bg-blue-50 text-16";

  return (
    <>
      <div className="h-10 p-2">
        <Link href="/dashboard">
          <Image src={LOGO_IMAGE} width={200} height={50} alt="CompanyLogo" />
        </Link>
      </div>
      <Divider key={Math.random()} />
      <Menu theme="light">
        <Menu.Item
          key="1"
          className={router.pathname === "/dashboard" && selectedStyle}
        >
          <Link href={"/dashboard"} className="flex items-center">
            <AppstoreFilled style={{ fontSize: "1.25rem" }} />
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          className={router.pathname === "/exercise" && selectedStyle}
        >
          <Link href={"/exercise"} className="flex items-center">
            <FireFilled style={{ fontSize: "1.25rem" }} />
            Exercise
          </Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          className={router.pathname === "/records" && selectedStyle}
        >
          <Link href={"/records"} className="flex items-center">
            <SignalFilled style={{ fontSize: "1.25rem" }} />
            Records
          </Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          className={router.pathname === "/settings" && selectedStyle}
        >
          <Link href={"/settings"} className="flex items-center">
            <SettingFilled style={{ fontSize: "1.25rem" }} />
            Settings
          </Link>
        </Menu.Item>
        <Menu.Divider key={Math.random()} />
        <Menu.Item
          key="5"
          className="font-bold"
          onClick={() => handleLogout(setUser)}
        >
          <div className="flex items-center">
            <LogoutOutlined style={{ fontSize: "1.25rem" }} />
            Logout
          </div>
        </Menu.Item>
      </Menu>

      <div className="w-40 h-24 text-white absolute left-2 bottom-32 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-2xl text-center pt-5">
        <p>Need Help?</p>
        <p>Feel free to contact me</p>
      </div>
    </>
  );
};

export default Sidenav;
