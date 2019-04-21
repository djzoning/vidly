import React, { Component } from "react";
import Table from "./table";
import { Link } from "react-router-dom";
import Like from "./common/like";
import auth from "./../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
      path: "title",
      label: "Title"
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: movie => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
      key: "like",
      label: "Like"
    }
  ];

  deleteColumn = {
    content: movie => {
      return (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      );
    },
    key: "action",
    label: "Action"
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    if (!movies.length)
      return (
        <p style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}>
          There are no movies in the database.
        </p>
      );

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
