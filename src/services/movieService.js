import http from "./httpService";
import config from "./../config.json";

const url = `/movies`;

const movieUrl = movieId => `${url}/${movieId}`;

const getMovies = () => http.get(url);

const getMovie = movieId => http.get(movieUrl(movieId));

const saveMovie = movie =>
  movie._id ? updateMovie(movie) : http.post(url, movie);

const deleteMovie = movieId => http.delete(movieUrl(movieId));

const updateMovie = movie => {
  const body = { ...movie };
  delete body._id;
  return http.put(movieUrl(movie._id), body);
};

export { getMovies, getMovie, saveMovie, deleteMovie };
