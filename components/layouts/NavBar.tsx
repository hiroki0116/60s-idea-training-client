import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "features/auth/stores/context/authContext";
import { SignUpOrLoginModal } from "features/auth/components/SignUpOrLogin";
import { LoginModal } from "features/auth/components/Login";
import { RegisterModal } from "features/auth/components/Signup";
// utils
import { isAuth } from "utils/auth_functions";
import { LOGO_IMAGE } from "utils/constants";
import Button from "antd/lib/button";

const NavBar = () => {
  const { setShowLoginOrRegister, setShowRegister } = useContext(AuthContext);
  return (
    <div className="bg-white fixed inset-x-0 top-0 ">
      <div className="items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between sm:max-w-6xl sm:mx-auto px-5 sm:px-5 md:px-5 lg:px-5 xl:px-0">
        <div className="pt-2">
          <Link href={"/"}>
            <Image src={LOGO_IMAGE} alt="Logo" width={180} height={150} />
          </Link>
        </div>
        {isAuth() ? (
          <div>
            <Button shape="round" type="primary" href="/dashboard">
              Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex sm:gap-5 gap-2 z-20">
            <Button
              onClick={() => setShowRegister(true)}
              shape="round"
              type="primary"
            >
              Register
            </Button>
            <Button onClick={() => setShowLoginOrRegister(true)} shape="round">
              Login
            </Button>
          </div>
        )}
      </div>
      <SignUpOrLoginModal />
      <LoginModal />
      <RegisterModal />
    </div>
  );
};

export default NavBar;
