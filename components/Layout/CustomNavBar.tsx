import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("components/layout/NavBar"));
// const NavBarMobile = dynamic(()=>import('components/Layout/NavBarMobile'));

const CustomNavBar = () => {
  return <NavBar />;
};

export default CustomNavBar;
