import { useEffect } from "react";
import { Badge,Dropdown, Menu } from "antd";

import { BellFilled } from "@ant-design/icons";

const Header = ({ name }) => {

  useEffect(() => window.scrollTo(0, 0));

  const menu = (
    <Menu className="rounded-lg max-w-sm whitespace-normal">
        <Menu.Item>
          <div className="text-gray-600">No, notification yet</div>
        </Menu.Item>
    </Menu>
  );

  return (
      <div className='flex justify-between bg-black h-16 items-center	text-white pr-10 pl-5 z-30'>
        <div className="uppercase tracking-widest">
          {name === "/records/[id]" ?  'idea record' : name.replace("/", "")}
        </div>
        <div >
          <Badge size="small">
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" className="text-lg">
              <BellFilled className='text-lg'/>
            </Dropdown>
          </Badge>
        </div>
      </div>
  );
}

export default Header;