import { useEffect } from "react";
import { Badge,Dropdown, Menu } from "antd";

import { BellFilled } from "@ant-design/icons";

const Header = ({ name }) => {

  useEffect(() => window.scrollTo(0, 0));

  const notifications = [
    {
      key:1,
      message:'Welcome to my application. Start your first exercise!'
    },
    {
      key:2,
      message:'New feature released! You can share your note on line!'
    },
    {
      key:3,
      message:'Something test3'
    }
  ]

  const menu = (
    <Menu className="rounded-lg max-w-sm whitespace-normal">
      {notifications.map((item) => (
        <Menu.Item key={item.key}>
          <div>{item.message}</div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
      <div className='flex justify-between bg-black h-16 items-center	text-white pr-10 pl-5 z-30'>
        <div className="uppercase tracking-wider">
          {name.replace("/", "")}
        </div>
        <div >
          <Badge size="small" count={2}>
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" className="text-lg">
              <BellFilled className='text-lg'/>
            </Dropdown>
          </Badge>
        </div>
      </div>
  );
}

export default Header;