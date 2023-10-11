import axios from "axios";
// import { useNavigate } from "react-router";
import { getRefreshToken } from "./services";

const instance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URI,
});
// Set a header for all requests
let access_token = localStorage.getItem("access_token");
if (access_token) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access_token")}`;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error)
    if (error.response.status === 401) {
      // Attempt to refresh token
      let refresh_token = localStorage.getItem("refresh_token");

      try {
        const response = await getRefreshToken({ refresh: refresh_token });
        // Update the access token in the request headers
        localStorage.setItem("access_token", response.access);
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.access}`;
        // Resend the original request with the updated access token
        return instance.request(error.config);
      } catch (error) {
      
        console.log("Token refresh error: ", error)
      }
    }
    return error;
  }
);
export default instance;

export const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URI,
});
instance.interceptors.response.use(
  (response) => {
    return response;
  }, 
); 


export const oemsAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
});
// let access_token = localStorage.getItem("access_token");
if (access_token) {
  oemsAxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access_token")}`;
}

// get token from local storage
const getTokenFromLS = () => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("_Token")) || {};
    } catch (e) {}
  }
  return ls["token"];
}

export const getAuthorizationToken = () => `Bearer ${getTokenFromLS()}`;