import { useState, useEffect, createContext } from "react";

import { setCookie } from "utils/auth_functions";
import { auth } from "../../../../config/firebase";

type AuthContent = {
  user: any;
  setUser: (u: any) => void;
  showLogin: boolean;
  setShowLogin: (sl: boolean) => void;
  showLoginOrRegister: boolean;
  setShowLoginOrRegister: (sl: boolean) => void;
  showRegister: boolean;
  setShowRegister: (sr: boolean) => void;
  afterPath: any;
  setAfterPath: (ap: any) => void;
  tokenRefreshed: boolean;
  ipAddress: string;
  isApply: boolean;
  setIsApply: (sr: boolean) => void;
  isClickContactHirerContext: boolean;
  setIsClickContactHirerContext: (sr: boolean) => void;
};

const initialState = {
  user: null,
  setUser: () => {},
  showLogin: false,
  setShowLogin: () => {},
  showRegister: false,
  setShowRegister: () => {},
  showLoginOrRegister: false,
  setShowLoginOrRegister: () => {},
  afterPath: "",
  setAfterPath: () => {},
  tokenRefreshed: false,
  ipAddress: "",
  isApply: false,
  setIsApply: () => {},
  isClickContactHirerContext: false,
  setIsClickContactHirerContext: () => {},
};

export const AuthContext = createContext<AuthContent>(initialState);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [showLoginOrRegister, setShowLoginOrRegister] =
    useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [afterPath, setAfterPath] = useState("");
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [isApply, setIsApply] = useState(false);
  const [isClickContactHirerContext, setIsClickContactHirerContext] =
    useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie("token", token);
        setTokenRefreshed(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showLoginOrRegister && (showLogin || showRegister))
      setShowLoginOrRegister(false);
  }, [showLoginOrRegister, showLogin, showRegister]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    showLoginOrRegister,
    setShowLoginOrRegister,
    afterPath,
    setAfterPath,
    tokenRefreshed,
    ipAddress,
    isApply,
    setIsApply,
    isClickContactHirerContext,
    setIsClickContactHirerContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
