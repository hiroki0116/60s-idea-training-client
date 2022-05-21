import dynamic from 'next/dynamic';
const NavBarDesktop = dynamic(()=> import('components/Layout/NavBarDesktop'));
// const NavBarMobile = dynamic(()=>import('components/Layout/NavBarMobile'));

const CustomNavBar = () => {

  return (
    <div className='px-8 pt-5 fixed inset-x-0 top-0 h-12 transition duration-1000 duration-1000 ease-in-out flex justify-between items-center'>
      <NavBarDesktop />
    </div>
  )
}

export default CustomNavBar