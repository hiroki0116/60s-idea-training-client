import axios, { AxiosInstance } from "axios";
import Router from "next/router";
import { getCookie, setCookie, isAuth } from "../utils/auth";

declare module "axios" {
  export interface AxiosRequestConfig {
    errorHandle?: boolean;
  }
}

const API: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

const APIWithoutAuth: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

// add token to header if currentUser is logged-in
API.interceptors.request.use(async (config: any) => {
  if (isAuth()) {
    // const token = await auth.currentUser.getIdToken();
    const token = getCookie("token");
    setCookie("token", token);
    //@ts-ignore
    config.headers = { Authorization: `Bearer ${token}` };
    return config;
  } else {
    // no way to get token
    return config;
  }
});

const errorResponseHandler = (error: any) => {
  // check for errorHandle config
  if (
    error.config.hasOwnProperty("errorHandle") &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      return Router.push("/error/404");
    } else if (status === 500) {
      return Router.push("/error/500");
    } else if (status === 401 || status == 403) {
      return Router.push("/403");
    } else {
      console.error(error.response.data.message);
      return Promise.reject(error);
    }
  }
};

API.interceptors.response.use((response) => response, errorResponseHandler);

export { API, APIWithoutAuth };
