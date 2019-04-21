import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Rentals from "./components/rentals";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout.jsx";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={currentUser} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => {
                return <Movies {...props} user={currentUser} />;
              }}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
