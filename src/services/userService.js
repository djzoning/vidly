import http from "./httpService";
import config from "./../config.json";
import auth from "./authService";

const registerUrl = `/users`;

const register = async user => {
  const { headers } = await http.post(registerUrl, user);
  auth.loginWithJwt(headers["x-auth-token"]);
};

export default {
  register
};
