import { useEffect, memo } from "react";
import { useTheme } from "next-themes";
import { PRIMARY_COLOR } from "utils/constants";
//Third Party
import Badge from "antd/lib/badge";
import Dropdown from "antd/lib/dropdown";
import Switch from "antd/lib/switch";
import BellFilled from "@ant-design/icons/BellFilled";
import type { MenuProps } from "antd";
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

  const items: MenuProps["items"] = [
    {
      label: "No notification yet",
      key: "0",
    },
  ];

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
        <div className="sm:flex sm:items-center hidden ">
          <Badge size="small">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              className="text-lg"
            >
              <BellFilled className="text-lg text-white" />
            </Dropdown>
          </Badge>
        </div>
      </div>
      <div className="md:hidden block">
        <MobileMenu />
      </div>
    </div>
  );
};

export default memo(Header);
