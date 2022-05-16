import { useContext } from 'react';
import { auth } from 'utils/firebase';
import { AuthContext } from 'context/authContext';
import { SignUpOrLoginModal } from 'components/auth/SignUpOrLogin';
import { LoginModal } from 'components/auth/Login';
import { RegisterModal } from 'components/auth/Signup';
import { logoutToHomePage,isAuth } from 'utils/auth';


const NavBarDesktop = () => {
  const { setUser, setShowLoginOrRegister, setShowRegister } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    logoutToHomePage();
  };
  
  const renderBeforeLogin = () => (
    <div className='flex flex-row items-center rounded-lg'>
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

  const renderAfterLogin = () => (
    <div className='flex text-base'>
      <a className="nav-link mr-8 cursor-pointer font-bold" onClick={handleLogout}>
        Logout
      </a>
    </div>
  )


  return isAuth() ? renderAfterLogin() : renderBeforeLogin();
}

export default NavBarDesktop