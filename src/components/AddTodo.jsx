import React, { Component } from "react";
import { toast } from "react-toastify";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

import "../styles/AddTodo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/reset.css";
import * as todoServices from "../services/todoServices";
import * as userServices from "../services/userServices";

/**
 *
 *
 * @export
 * @class AddTodo
 * @extends {Component}
 */
export class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      isSubTask: false,
      isAdmin: false,
      titleModal: "",
      todoTitle: "",
      todoContent: "",
      assignedTo: "",
      priority: "pending",
      parentId: "",
      level: "user",
      users: []
    };
  }

  componentWillMount() {
    this.setState({
      isSubTask: this.props.isSubTask,
      titleModal: this.props.titleModal,
      parentId: this.props.parentId,
      level: this.props.level || "user"
    });
  }

  componentDidMount() {
    this.state.level === "admin" && this.getUsers();
  }

  selectPriority(event) {
    this.setState({
      priority: event.target.value
    });
  }

  selectAssignedTo(event) {
    const userId = this.findUserId(event.target.value);
    console.log("userId", userId);
    this.setState({
      assignedTo: userId
    });
  }

  findUserId(username) {
    console.log("username", username);
    return this.state.users.filter(user => {
      return user.username === username;
    })[0]._id;
  }

  getUsers() {
    userServices.getUsers().then(response => {
      this.setState({
        users: response.data.message,
        assignedTo: response.data.message[0]._id || null
      });
    });
  }

  onTodoTitleChanged = event => {
    this.setState({
      todoTitle: event.target.value
    });
  };

  onTodoContentChanged = event => {
    this.setState({
      todoContent: event.target.value
    });
  };

  onSubmitClicked = event => {
    if (this.state.todoTitle === "") {
      toast.error("Todo title cannot be empty");
    } else {
      event.preventDefault();
      if (!this.state.isSubTask) {
        todoServices
          .addToDoItem({
            title: this.state.todoTitle,
            content: this.state.todoContent,
            assignedTo: this.state.assignedTo,
            priority: this.state.priority
          })
          .then(response => {
            if (response.status === 201) {
              toast.success("Todo Added Successfully");
              this.setState({
                todoTitle: "",
                todoContent: ""
              });
              this.props.handleClose();
              this.props.reloadList();
            } else {
              toast.error("status", response.status);
            }
          })
          .catch(err => {
            toast.error(err);
          });
      } else {
        todoServices
          .addSubToDoItem(this.state.parentId, {
            title: this.state.todoTitle,
            content: this.state.todoContent
          })
          .then(response => {
            if (response.status === 201) {
              toast.success("Todo Added Successfully");
              this.props.handleClose();
              this.props.reloadList();
              this.setState({
                todoTitle: "",
                todoContent: ""
              });
            } else {
              toast.error("status", response.status);
            }
          })
          .catch(err => {
            toast.error(err);
          });
      }
    }
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {!this.state.isSubTask ? "Add Task" : "Add Sub Task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Title of your todo"
                value={this.state.todoTitle}
                onChange={this.onTodoTitleChanged}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Content</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="Content of your todo"
                value={this.state.todoContent}
                onChange={this.onTodoContentChanged}
              />
            </InputGroup>
            <label htmlFor="priority"> Priority:</label>
            <select
              id="priority"
              name="prioriy"
              onClick={e => this.selectPriority(e)}
            >
              <option value="pending">Pending</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
            {this.state.level === "admin" ? (
              <>
                <label htmlFor="user"> Assign to:</label>
                <select
                  id="user"
                  name="user"
                  onClick={e => this.selectAssignedTo(e)}
                >
                  {this.state.users.map(user => {
                    return (
                      <option key={user._id} value={user.username}>
                        {user.username}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              // <input list="browsers" name="browser">
              //   <datalist id="browsers">
              //     <option value="Internet Explorer" />
              //     <option value="Firefox" />
              //     <option value="Chrome" />
              //     <option value="Opera" />
              //     <option value="Safari" />
              //   </datalist>
              // </input>
              <> </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onSubmitClicked}>
              Add Todo
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddTodo;
