import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import getPaginatedData from "./../utils/getPaginatedData";
import { getMovies, deleteMovie } from "./../services/movieService";
import { getGenres } from "./../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
    const { data: dbGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...dbGenres];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async ({ _id: movieId }) => {
    const originalMovies = [...this.state.movies];
    try {
      const movies = originalMovies.filter(movie => movie._id !== movieId);
      this.setState({ movies });
      const response = await deleteMovie(movieId);
      console.log("Movie was deleted successfully ID:", response.data._id);
      toast("The movie was deleted successfully.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Expected error - movie not found in database
        return toast.error("The movie has already been deleted.");
      } else if (error.response && error.response.status === 403) {
        // Forbidden - access denied need admin role
        toast.error("This action is not allowed.");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...this.state.movies[index] };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  render() {
    const { movies, moviesCount } = getPaginatedData(this.state);
    const { user } = this.props;

    return (
      <div className="row m-5">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>{`Showing ${moviesCount} movies in the database.`}</p>
          <SearchBox onChange={this.handleSearch} value={this.searchQuery} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
          />
          <Pagination
            onPageChange={this.handlePageChange}
            pageSize={this.state.pageSize}
            itemsCount={moviesCount}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
