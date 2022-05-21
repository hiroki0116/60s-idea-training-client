import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import { SignUpOrLoginModal } from 'components/auth/SignUpOrLogin';
import { LoginModal } from 'components/auth/Login';
import { RegisterModal } from 'components/auth/Signup';
import { isAuth } from 'utils/auth';
import Link from 'next/link';
import { LOGO_IMAGE } from 'utils/constants';
import Image from 'next/image';


const NavBarDesktop = () => {
  const { setShowLoginOrRegister, setShowRegister } = useContext(AuthContext);



  const renderLogo = () => (
    <>
      <Link href={'/'}>
          <a className='pt-3'>
              <Image src={LOGO_IMAGE} alt='Logo' width={200} height={50} />
          </a>
      </Link>
    </>
  )
  
  const renderBeforeLogin = () => (
    <div className='flex flex-row items-center rounded-lg'>
      {renderLogo()}
      <div className='flex text-base'>
        <a className="nav-link mr-8 cursor-pointer font-bold" onClick={()=>setShowRegister(true)}>
          Register
        </a>
        <a className="nav-link cursor-pointer font-bold" onClick={()=>setShowLoginOrRegister(true)}>
          Login
        </a>
      </div>
      <SignUpOrLoginModal />
      <LoginModal />
      <RegisterModal />
    </div>
  )

  return  !isAuth() && renderBeforeLogin()
}

export default NavBarDesktop