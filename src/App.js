import { toast } from "react-toastify";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import { Todo } from "./routes/Todo";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard } from "./routes/Dashboard";

class App extends Component {
  render() {
    toast.configure();
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/:todoId">
            <Todo />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
