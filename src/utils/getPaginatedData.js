import pagination from "./pagination";
import _ from "lodash";

export default ({
  selectedGenre,
  movies,
  sortColumn,
  currentPage,
  pageSize,
  searchQuery
}) => {
  const filteredMovies =
    selectedGenre && selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies.filter(m => search(m, searchQuery));
  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );
  const paginatedMovies = pagination(sortedMovies, currentPage, pageSize);
  const moviesCount = filteredMovies.length;

  return { movies: paginatedMovies, moviesCount };
};

let search = (movie, currentSearch) => {
  const regex = new RegExp(currentSearch, "i");
  return movie.title.search(regex) !== -1;
};
