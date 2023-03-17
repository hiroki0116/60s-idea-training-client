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
        width="50vw"
        title={
          <>
            <Avatar
              size="large"
              src={
                currAuthUser()?.images?.length && currAuthUser()?.images[0].url
              }
              alt="user image"
              style={{ marginBottom: "10px" }}
            />

            <Typography.Text ellipsis className="capitalize">
              Welcome {currAuthUser()?.firstName} !
            </Typography.Text>
          </>
        }
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Menu>
          <Menu.Item>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/exercise">
              <a>Exercise</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/records">
              <a>Records</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
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
