import { useEffect } from "react";
import { useTheme } from "next-themes";
import { PRIMARY_COLOR } from "utils/constants";
//Third Party
import Badge from "antd/lib/badge";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import Switch from "antd/lib/switch";
import BellFilled from "@ant-design/icons/BellFilled";
//Components
import MobileMenu from "./MobileMenu";

const Header = ({ pathname }) => {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleTheme = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => window.scrollTo(0, 0));

  const menu = (
    <Menu className="rounded-lg max-w-sm whitespace-normal">
      <Menu.Item>
        <div className="text-gray-600">No, notification yet</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="flex justify-between h-14 items-center text-white px-5 rounded-xl mb-5"
      style={{ backgroundColor: PRIMARY_COLOR }}
    >
      <div className="uppercase tracking-widest font-sans">
        {pathname === "/records/[id]"
          ? "idea record"
          : pathname.replace("/", "")}
      </div>
      <div className="flex items-center gap-10">
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          onChange={handleTheme}
          checked={currentTheme === "dark"}
          style={{ background: "#0f172a" }}
        />
        <div className="sm:block hidden">
          <Badge size="small">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
              className="text-lg"
            >
              <BellFilled className="text-lg" />
            </Dropdown>
          </Badge>
        </div>
      </div>
      <div className="sm:hidden block">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;