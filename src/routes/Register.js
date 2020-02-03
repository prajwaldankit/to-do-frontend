import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../config/axios";
import "../styles/App.css";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    axios
      .post("/users/register", {
        email: this.state.email.value,
        password: this.state.password.value,
        username: this.state.username.value
      })
      .then(response => {
        console.log(response);
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
        console.log(err.response);
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
        <div className="register-container">
          <div className="register-card">
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

              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username..."
                  value={this.state.username.value || ""}
                  onChange={this.onChangeHandler}
                  isInvalid={this.state.username.isInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.username.invalidMessage}
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
                Register
              </Button>
            </Form>
            <div className="login-link">
              Already a member? <Link to="/login"> Login here </Link>
            </div>
          </div>
        </div>
      );
  }
}

export default Register;
