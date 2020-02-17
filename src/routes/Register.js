import { toast } from "react-toastify";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "../styles/App.css";
import Header from "./../components/Header";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../services/user";

/**
 *
 *
 * @export
 * @class Register
 * @extends {Component}
 */
export class Register extends Component {
  constructor() {
    super();
    this.state = {
      buttonClicked: false,
      email: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      username: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      password: {
        value: "",
        isInvalid: false,
        invalidMessage: ""
      },
      isRegistrationComplete: false
    };
  }

  onSubmitClick = event => {
    event.preventDefault();
    registerUser({
      email: this.state.email.value,
      password: this.state.password.value,
      username: this.state.username.value
    })
      .then(response => {
        if (response.status === 200) {
          toast.success("User successfully created. Redirected to Login page");
          this.setState({
            isRegistrationComplete: true
          });
        } else {
          toast.error("Some error occured. Please try again later.");
        }
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
    if (this.state.isRegistrationComplete) {
      return <Redirect to="/login" />;
    } else
      return (
        <>
          <Header />
          <div className="container">
            <div className="content">
              {/* <form action="">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter your email"
                  value={this.state.email.value || ""}
                  onChange={this.onChangeHandler}
                  // isInvalid={this.state.email.isInvalid}
                />
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  value={this.state.username.value || ""}
                  onChange={this.onChangeHandler}
                  // isInvalid={this.state.username.isInvalid}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="enter your password"
                  value={this.state.password.value || ""}
                  onChange={this.onChangeHandler}
                  // isInvalid={this.state.password.isInvalid}
                />
                <button type="submit" onClick={this.onSubmitClick}>
                  Register
                </button>
              </form> */}
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

                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username..."
                    value={this.state.username.value || ""}
                    onChange={this.onChangeHandler}
                    isInvalid={this.state.username.isInvalid}
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
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.onSubmitClick}
                  className="btn btn-register"
                >
                  Register
                </Button>
              </Form>
              <div>
                Already a member? <Link to="/login"> Login here </Link>
              </div>
            </div>
          </div>
        </>
      );
  }
}

export default Register;
