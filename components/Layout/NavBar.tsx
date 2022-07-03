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


const NavBar = () => {
  const { setShowLoginOrRegister, setShowRegister } = useContext(AuthContext);

  return  (
    <>
      <div className='bg-white sm:px-20 px-3 fixed inset-x-0 top-0 items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between'>
        <div className='pt-2'>
          <Link href={'/'}>
            <a>
              <Image src={LOGO_IMAGE} alt='Logo' width={180} height={150} />
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
          <div className='flex sm:gap-5 gap-2 z-20'>
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

export default NavBar