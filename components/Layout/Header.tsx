import { useEffect } from "react";
import { PRIMARY_COLOR } from "utils/constants";
//Third Party
import { Badge,Dropdown, Menu } from "antd";
import { BellFilled } from "@ant-design/icons";
//Components
import MobileMenu from 'components/Layout/MobileMenu';

const Header = ({ pathname }) => {

  useEffect(() => window.scrollTo(0, 0));

  const menu = (
    <Menu className="rounded-lg max-w-sm whitespace-normal">
        <Menu.Item>
          <div className="text-gray-600">No, notification yet</div>
        </Menu.Item>
    </Menu>
  );

  return (
      <div className='flex justify-between h-14 items-center text-white px-5 rounded-xl mb-5' style={{backgroundColor:PRIMARY_COLOR}}>
        <div className="uppercase tracking-widest font-sans">
          {pathname === "/records/[id]" ?  'idea record' : pathname.replace("/", "")}
        </div>
        <div className="sm:block hidden">
          <Badge size="small">
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" className="text-lg">
              <BellFilled className='text-lg'/>
            </Dropdown>
          </Badge>
        </div>
        <div className="sm:hidden block">
          <MobileMenu />
        </div>
      </div>
  );
}

export default Header;