import http from "./httpService";
import config from "./../config.json";

const url = `/genres`;

export const getGenres = () => http.get(url);
