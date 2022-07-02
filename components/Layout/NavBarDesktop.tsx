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
      <div className='bg-white px-20 fixed inset-x-0 top-0 items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between'>
            <div className='pt-2'>
              <Link href={'/'}>
                <a>
                  <Image src={LOGO_IMAGE} alt='Logo' width={230} height={180} />
                </a>
              </Link>
            </div>
          {isAuth() ? (
            <Link className='flex' href='/dashboard' passHref>
              <Button shape='round' type='primary'>
                Dashboard
              </Button>          
            </Link>
          ) : (
            <div className='flex gap-5 z-20'>
              <Button onClick={()=>setShowRegister(true)} shape='round' type='primary'>
                Register
              </Button>
              <Button onClick={()=>setShowLoginOrRegister(true)} shape='round'>
                Login
              </Button>
            </div>
          )}
      </div>
      <SignUpOrLoginModal />
      <LoginModal />
      <RegisterModal />
    </>
  )
}

export default NavBarDesktop