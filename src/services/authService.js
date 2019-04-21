import http from "./httpService";
import jwtDecode from "jwt-decode";
import config from "./../config.json";

const authUrl = `/auth`;

const login = async user => {
  const { data } = await http.post(authUrl, user);
  localStorage.setItem(config.tokenKey, data);
};

const loginWithJwt = jwt => {
  localStorage.setItem(config.tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(config.tokenKey);
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem(config.tokenKey);
    const currentUser = jwtDecode(token);
    return currentUser;
  } catch (error) {
    return null;
  }
};

const getJwt = () => localStorage.getItem(config.tokenKey);

http.setJwt(getJwt());

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
