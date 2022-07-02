import dynamic from 'next/dynamic';
const NavBarDesktop = dynamic(()=> import('components/Layout/NavBarDesktop'));
// const NavBarMobile = dynamic(()=>import('components/Layout/NavBarMobile'));

const CustomNavBar = () => {

  return (
      <NavBarDesktop />
  )
}

export default CustomNavBar