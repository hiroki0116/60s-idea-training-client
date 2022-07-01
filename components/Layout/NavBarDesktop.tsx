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
      <div className='flex justify-between items-center w-full'>
            <div>
              <Link href={'/'}>
                <a>
                  <Image src={LOGO_IMAGE} alt='Logo' width={200} height={50} />
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
            <div className='flex gap-5'>
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