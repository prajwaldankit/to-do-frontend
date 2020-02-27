import React, { Component } from "react";
import { toast } from "react-toastify";

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
  constructor(props) {
    super(props);
    this.state = {
      isSubTask: this.props.isSubTask || false,
      isAdmin: false,
      titleModal: this.props.titleModal || "",
      todoTitle: "",
      todoContent: "",
      assignedTo: "",
      selectedUserIds: [],
      selectedUsers: [],
      priority: "pending",
      parentId: this.props.parentId || "",
      level: this.props.level || "user",
      users: []
    };
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
    this.setState({
      assignedTo: userId,
      selectedUsers: !this.state.selectedUsers.includes(event.target.value)
        ? [...this.state.selectedUsers, event.target.value]
        : [...this.state.selectedUsers],
      selectedUserIds: !this.state.selectedUserIds.includes(userId)
        ? [...this.state.selectedUserIds, userId]
        : [...this.state.selectedUserIds]
    });
  }

  findUserId(username) {
    return this.state.users.filter(user => {
      return user.username === username;
    })[0]._id;
  }

  getUsers() {
    userServices.getUsers().then(response => {
      this.setState({
        users: response.data
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

  onRemoveSelectedUser(value) {
    const indexToRemove = this.state.selectedUsers.indexOf(value);
    this.setState({
      selectedUsers: [
        ...this.state.selectedUsers.slice(0, indexToRemove),
        ...this.state.selectedUsers.slice(indexToRemove + 1)
      ],
      selectedUserIds: [
        ...this.state.selectedUserIds.slice(0, indexToRemove),
        ...this.state.selectedUserIds.slice(indexToRemove + 1)
      ]
    });
  }

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
            priority: this.state.priority,
            selectedUsers: this.state.selectedUserIds
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
      <div className="modal__container">
        <div className="modal__content">
          <div className="modal__header">
            <div className="model__title">
              {!this.state.isSubTask ? "Add Task" : "Add Sub Task"}
            </div>
            <button className="btn" onClick={e => this.props.handleClose()}>
              <i className="far fa-window-close"></i>
            </button>
          </div>
          <div className="modal__body">
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title..."
                id="title"
                value={this.state.todoTitle}
                onChange={this.onTodoTitleChanged}
              />
              <label htmlFor="title">Content:</label>
              <input
                type="text"
                name="content"
                placeholder="Enter content..."
                id="content"
                value={this.state.todoContent}
                onChange={this.onTodoContentChanged}
              />
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
                  Selected Users:{" "}
                  <ol>
                    {this.state.selectedUsers.map((value, index) => {
                      return (
                        <li key={index}>
                          {value}{" "}
                          <button
                            onClick={() => this.onRemoveSelectedUser(value)}
                          >
                            X
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </>
              ) : (
                <> </>
              )}
            </div>
          </div>
          <div className="modal__footer">
            <button className="btn " onClick={this.onSubmitClicked}>
              Add Todo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTodo;
