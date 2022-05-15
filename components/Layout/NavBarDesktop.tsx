import { useContext } from 'react';
import { auth } from 'utils/firebase';
import { AuthContext } from 'context/authContext';
import { SignUpOrLoginModal } from 'components/auth/SignUpOrLogin';
import { LoginModal } from 'components/auth/Login';
import { RegisterModal } from 'components/auth/Signup';
import { logoutToHomePage } from 'utils/auth';


const NavBarDesktop = () => {
  const { user, setUser, setShowLoginOrRegister, setIsApply } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    logoutToHomePage();
  };
  
  const renderSignInUpContent = () => (
    <div className='flex flex-row items-center rounded-lg px-5'>
      <div className='flex text-base'>
        <a className="nav-link mr-4 cursor-pointer" onClick={()=>setShowLoginOrRegister(true)}>
          SignIn
        </a>
      </div>
      <SignUpOrLoginModal />
      <LoginModal />
      <RegisterModal />
    </div>
  )
  return (
    <div className="flex flex-row items-center  translate-x-20 ">
      {renderSignInUpContent()}
    </div>
  )
}

export default NavBarDesktop