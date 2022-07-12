import cookie from 'js-cookie';
import Router from 'next/router';
import { API, APIWithoutAuth } from './api';
import { auth } from 'utils/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { IUser } from 'types/User'

export const setCookie = (key:string, value:string) => {
  if (typeof window) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const removeCookie = (key:string) => {
  if (typeof window) {
    cookie.remove(key);
  }
};

export const getCookie = (key:string, req?: any) => {
  return cookie.get(key);
};

export const setLocalStorage = (key:string, value:string) => {
  if (typeof window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key:string) => {
  if (typeof window) {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorage = (key:string) => {
  if (typeof window) {
    localStorage.removeItem(key);
  }
};

export const saveUserAndToken = (user: any, token:string) => {
  setCookie('token', token);
  setLocalStorage('user', user);
  setLocalStorage('registered', user.createdAt);
};

export const isAuth = () => currAuthUser() !== undefined;

export const currAuthUser = () => {
  if (typeof window) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      const userString:any = localStorage.getItem('user');

      if (userString && userString !== 'undefined') {
        const userObj = JSON.parse(userString);
        return userObj;
      }
      return undefined;
    }
  }
  return undefined;
};

export const isAdminAuth = (userObj:IUser) => userObj?.role?.includes('admin');

export const logoutToHomePage = () => {
  removeCookie('token');
  removeLocalStorage('user');
  Router.push('/');
};

export const logout = () => {
  removeCookie('token');
  removeLocalStorage('user');
};

export const syncAuthFromDB = async (id: string) => {
  try {
    const res = await API.get(`/users/${id}`);
    setLocalStorage('user', res.data.user);
    return res.data.user;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const checkIfHirerVerified = (userFromDB:IUser) => {
  if (!userFromDB) return false;
  if (userFromDB.role.includes('admin')) return true;
  return true;
};

export const authUserByToken = async (token:string) => {
  try {
    const res = await APIWithoutAuth.post(`/auth/signin/token/${token}`);
    const user = res.data.user;
    return user;
  } catch (error: any) {
    console.error(error.response.data.message);

  }
};

export const signInWithCustomTokens = async (token:string) => {
  try {
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential;
  } catch (error: any) {
    console.error('error on signing in with custom token ', error.message);
  }
}

export const handleLogout = (setUser) => {
  auth.signOut();
  setUser(null);
  logoutToHomePage();
};