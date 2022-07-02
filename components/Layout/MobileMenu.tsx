import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from 'context/authContext';
import { Menu, Avatar, Typography, Drawer } from 'antd';
import { currAuthUser } from 'utils/auth';
import _ from 'lodash';
import { MenuOutlined } from '@ant-design/icons';
import { handleLogout } from "utils/auth";


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
                src={currAuthUser()?.images[0].url}
                alt="user image"
                style={{marginBottom:'10px'}}
              />

              <Typography.Text ellipsis className='capitalize'>Welcome {currAuthUser()?.firstName} !</Typography.Text>
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

            <Menu.Item onClick={()=>handleLogout(setUser)}>
                Logout
            </Menu.Item>
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
