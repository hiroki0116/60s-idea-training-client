import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import { SignUpOrLoginModal } from 'components/auth/SignUpOrLogin';
import { LoginModal } from 'components/auth/Login';
import { RegisterModal } from 'components/auth/Signup';
import { isAuth } from 'utils/auth';
import Link from 'next/link';
import { LOGO_IMAGE } from 'utils/constants';
import Image from 'next/image';
import { Button } from 'antd';


const NavBarDesktop = () => {
  const { setShowLoginOrRegister, setShowRegister } = useContext(AuthContext);

  return  (
    <>
    
      <div className='flex justify-around items-center bg-white sm:bg-transparent'>
      {isAuth() ? (
        <>
          <div>
            <Link href={'/'}>
              <a className='pt-3'>
                <Image src={LOGO_IMAGE} alt='Logo' width={200} height={50} />
              </a>
            </Link>
          </div>
          <div>
            <Link className='flex text-base' href='/dashboard' passHref>
              <Button className="nav-link cursor-pointer font-bold text-white" shape='round'>
                Dashboard
              </Button>          
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href={'/'}>
              <a className='pt-3'>
                <Image src={LOGO_IMAGE} alt='Logo' width={200} height={50} />
              </a>
            </Link>
          </div>
          <div className='flex text-base'>
            <Button className="nav-link mr-8 cursor-pointer font-bold text-white" onClick={()=>setShowRegister(true)} shape='round'>
              Register
            </Button>
            <Button className="nav-link cursor-pointer font-bold text-white" onClick={()=>setShowLoginOrRegister(true)} shape='round'>
              Login
            </Button>
          </div>
        </>
        )}
      </div>
      <SignUpOrLoginModal />
      <LoginModal />
      <RegisterModal />
    </>
  )
}

export default NavBarDesktop