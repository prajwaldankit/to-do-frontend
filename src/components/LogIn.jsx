import { toast } from "react-toastify";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "../styles/App.css";
import Header from "./Header";
import { loginUser } from "./../services/userServices";
import "react-toastify/dist/ReactToastify.css";

/**
 *
 *
 * @export
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonClicked: false,
      email: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      password: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      isLoggedIn: false,
      userData: {}
    };
  }

  onSubmitClick = event => {
    event.preventDefault();
    loginUser({
      email: this.state.email.value,
      password: this.state.password.value
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.tokens.token);
        localStorage.setItem("refreshToken", response.data.tokens.tokenRefresh);
        this.setState({
          isLoggedIn: true,
          userData: response.data.user
        });
        toast.success("Logged in successfully");
      })
      .catch(err => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
  };

  onChangeHandler = event => {
    let changedField = event.target.id;
    this.setState(
      {
        [changedField]: {
          value: event.target.value
        }
      },
      () => {
        if (this.state[changedField]["value"] === "") {
          this.setState({
            [changedField]: {
              isInvalid: true,
              invalidMessage: changedField + " cannot be empty."
            }
          });
        }
      }
    );
  };

  render() {
    if (this.state.isLoggedIn)
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { userData: this.state.userData }
          }}
        />
      );
    else {
      return (
        <>
          <Header />
          <div className="login container">
            <div className="login content">
              <Form>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email..."
                    value={this.state.email.value || ""}
                    onChange={this.onChangeHandler}
                    isInvalid={this.state.email.isInvalid}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password..."
                    value={this.state.password.value || ""}
                    onChange={this.onChangeHandler}
                    isInvalid={this.state.password.isInvalid}
                  />
                </Form.Group>
                <button
                  variant="primary"
                  type="submit"
                  onClick={this.onSubmitClick}
                  className="btn btn-login"
                >
                  Login
                </button>
                <Form.Control.Feedback type="invalid">
                  Something went wrong. Please try again.
                </Form.Control.Feedback>
              </Form>
              <div className="register-link">
                New here? <Link to="/register">Register Now</Link>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Login;
