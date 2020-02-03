import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../config/axios";
import "../styles/App.css";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Login extends Component {
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
      isLoggedIn: false
    };
  }

  onSubmitClick = event => {
    event.preventDefault();
    axios
      .post("/users/login", {
        email: this.state.email.value,
        password: this.state.password.value
      })
      .then(response => {
        console.log(response);
        toast.success("Logged in successfully");
        localStorage.setItem("authorization", response.data.token);
        this.setState({
          isLoggedIn: true
        });
      })
      .catch(err => {
        toast.error(err.response.data.message);
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
    if (this.state.isLoggedIn) return <Redirect to="/dashboard" />;
    else {
      return (
        <div className="login-container">
          <div className="login-card">
            <div className="logo-holder">
              <i className="fas fa-tasks logo-icon"></i>tarea
            </div>
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
                <Form.Control.Feedback type="invalid">
                  {this.state.email.invalidMessage}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {this.state.password.invalidMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.onSubmitClick}
              >
                Login
              </Button>
              <Form.Control.Feedback type="invalid">
                Something went wrong. Please try again.
              </Form.Control.Feedback>
            </Form>
            <div className="register-link">
              New here? <Link to="/register">Register Now</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
