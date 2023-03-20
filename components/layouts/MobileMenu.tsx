import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "features/auth/stores/context/authContext";
import Menu from "antd/lib/menu";
import Avatar from "antd/lib/avatar";
import Typography from "antd/lib/typography";
import Drawer from "antd/lib/drawer";
import _ from "lodash";
import MenuOutlined from "@ant-design/icons/MenuFoldOutlined";
// utils
import { currAuthUser } from "utils/auth_functions";
import { handleLogout } from "utils/auth_functions";

const MobileMenu = () => {
  const { setUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Drawer
        width="45vw"
        bodyStyle={{ paddingRight: "0", paddingLeft: "0" }}
        title={
          <>
            <div className="flex justify-center">
              <Avatar
                size="large"
                src={
                  currAuthUser()?.images?.length &&
                  currAuthUser()?.images[0].url
                }
                alt="user image"
                style={{ marginBottom: "10px" }}
              />
            </div>
            <p className="capitalize">Welcome {currAuthUser()?.firstName} !</p>
          </>
        }
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu inlineIndent={15} mode="inline">
          <Menu.Item>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/exercise">Exercise</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/records">Records</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/settings">Settings</Link>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item onClick={() => handleLogout(setUser)}>Logout</Menu.Item>
        </Menu>
      </Drawer>

      <MenuOutlined
        className="text-xl text-white px-3 py-2 rounded cursor-pointer"
        onClick={() => setVisible(true)}
      />
    </>
  );
};

export default MobileMenu;
