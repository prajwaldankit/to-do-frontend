import { toast } from "react-toastify";
import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TodoRoute from "./routes/TodoRoute";
import LoginRoute from "./routes/LoginRoute";
import ProfileRoute from "./routes/ProfileRoute";
import RegisterRoute from "./routes/RegisterRoute";
import DashboardRoute from "./routes/DashboardRoute";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  checkLoggedIn() {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    toast.configure();
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {props => {
              return <DashboardRoute {...props} />;
            }}
          </Route>
          <Route exact path="/dashboard">
            {props => {
              return <DashboardRoute {...props} />;
            }}
          </Route>
          <Route exact path="/login">
            <LoginRoute />
          </Route>
          <Route exact path="/register">
            <RegisterRoute />
          </Route>
          <Route exact path="/profile/:profileId">
            {props => {
              return <ProfileRoute {...props} />;
            }}
          </Route>
          <Route exact path="/todo/:todoId">
            {props => {
              return <TodoRoute {...props} />;
            }}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
