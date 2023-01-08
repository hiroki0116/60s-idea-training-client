import axios, { AxiosInstance } from 'axios';
import Router from 'next/router';
import { auth } from 'utils/firebase';
import { getCookie, setCookie, isAuth,logoutToHomePage } from './auth';

declare module 'axios' {
    export interface AxiosRequestConfig {
      errorHandle?: boolean;
    }
}

const API: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}`
});

const APIWithoutAuth: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}`  
});

// add token to header if currentUser is logged-in
API.interceptors.request.use(async (config:any) => {
    if (isAuth()) {
      // const token = await auth.currentUser.getIdToken();
      const token = getCookie("token");
      setCookie('token', token);
      //@ts-ignore
      config.headers = { Authorization: `Bearer ${token}` };
      return config;
    } else {
      // no way to get token
      return config;
    }
});

const errorResponseHandler = (error:any) => {

    // check for errorHandle config
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error);
    }
  
    // if has response show the error
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        const user = error.response.data.extras;
        return user && !user.verified ? Router.push(`/auth/verify-email`) : Router.push('/403');
      } else if (status === 404) {
        return Router.push('/404');
      } else if (status === 500) {
        return Router.push('/500');
      } else if (status === 400) {
        return Router.push('/400');
      } else if (status === 401) {
          auth.signOut();
          logoutToHomePage();
      } else {
        console.error(error.response.data.message);
        return Promise.reject(error);
      }
    }
};

API.interceptors.response.use((response) => response, errorResponseHandler);

export { API, APIWithoutAuth };