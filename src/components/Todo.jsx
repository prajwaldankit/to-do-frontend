import React, { Component } from "react";
import { toast } from "react-toastify";

import Header from "../components/Header";
import SubList from "../components/SubList";
import AddSubTodoForm from "./AddSubTodoForm";
import PriorityIcon from "../components/PriorityIcon";
import * as todoServices from "../services/todoServices";
import * as userServices from "./../services/userServices";

/**
 *
 *
 * @export
 * @class Todo
 * @extends {Component}
 */
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: this.props.location.state.parent || {},
      taskStatus: this.props.location.state.parent.checked || false,
      subTodos: [],
      todoTitle: "",
      todoContent: "",
      userData: {},
      hasUserData: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.selectPriority = this.selectPriority.bind(this);
    this.onRemoveSubTodo = this.onRemoveSubTodo.bind(this);
    this.selectAssignedTo = this.selectAssignedTo.bind(this);
    this.onTodoTitleChanged = this.onTodoTitleChanged.bind(this);
    this.onTodoContentChanged = this.onTodoContentChanged.bind(this);
  }

  componentDidMount() {
    this.getSubTodos();
    this.getUserData();
  }

  getUserData() {
    userServices.getUserData().then(res => {
      this.setState({
        userData: res.data,
        hasUserData: true
      });
    });
  }

  getSubTodos() {
    todoServices.getSubToDoList(this.state.parent._id).then(res =>
      this.setState({
        subTodos: res.data.subTodos
      })
    );
  }
  checkCompletion() {
    const remaining = this.state.subTodos.filter(subTodo => {
      return !subTodo.checked;
    });
    return remaining.length ? true : false;
  }

  onTodoTitleChanged(value) {
    this.setState({
      todoTitle: value
    });
  }

  onTodoContentChanged(value) {
    this.setState({
      todoContent: value
    });
  }

  selectPriority(value) {
    this.setState({
      priority: value
    });
  }

  selectAssignedTo(value) {
    const userId = this.findUserId(value);
    this.setState({
      assignedTo: userId
    });
  }

  findUserId(username) {
    return this.state.parent.assignedUsers.filter(user => {
      return user.username === username;
    })[0]._id;
  }

  handleSubmit(event) {
    if (this.state.todoTitle === "") {
      toast.error("Todo title cannot be empty");
    } else {
      event.preventDefault();
      todoServices
        .addSubToDoItem(this.state.parent._id, {
          title: this.state.todoTitle,
          content: this.state.todoContent,
          priority: this.state.priority,
          assignedTo: this.state.assignedTo
        })
        .then(response => {
          if (response.status === 201) {
            toast.success("Todo Added Successfully");
            this.setState({
              todoTitle: "",
              todoContent: ""
            });
            this.getSubTodos();
          } else {
            toast.error("status", response.status);
          }
        })
        .catch(err => {
          toast.error(err);
        });
    }
  }

  onRemoveSubTodo(parentId, item) {
    todoServices.removeSubToDoItem(parentId, item).then(response => {
      toast.success(response.data.message);
      this.getSubTodos();
    });
  }

  handleCompletion() {
    const remaining = this.checkCompletion();
    if (!remaining) {
      todoServices
        .editToDoItem({ _id: this.state.parent._id, checked: true })
        .then(res =>
          this.setState({
            taskStatus: true
          })
        );
    } else {
      todoServices
        .editToDoItem({ _id: this.state.parent._id, checked: false })
        .then(res =>
          this.setState({
            taskStatus: false
          })
        );
    }
  }

  onCheckHandler(value) {
    value.checked = !value.checked;
    todoServices
      .editSubToDoItem(this.state.parent._id, {
        _id: value._id,
        checked: value.checked
      })
      .then(response => {
        toast.success(
          `${value.title} is now ${value.checked ? "checked" : "unchecked"}`
        );
        let tempItems = this.state.todos;
        this.setState({ todos: tempItems });
        this.handleCompletion();
      })
      .catch(err => {
        toast.error("sorry couldn't change the check status");
      });
  }

  render() {
    return (
      <>
        <Header
          isLogged={true}
          handleLogOut={this.props.location.handleLogOut}
          userData={this.state.userData}
          hasUserData={this.state.hasUserData}
        />
        <div className="remaining-tabs">
          <h1>{this.state.parent.title}</h1>
          <h2>Status: {this.state.taskStatus ? "Completed" : "Remaining"}</h2>
          <PriorityIcon priority={this.state.parent.priority} />
          <AddSubTodoForm
            todoTitle={this.state.todoTitle}
            todoContent={this.state.todoContent}
            onTodoTitleChanged={this.onTodoTitleChanged}
            onTodoContentChanged={this.onTodoContentChanged}
            onSelectPriority={this.selectPriority}
            onselectAssignedTo={this.selectAssignedTo}
            assignedUsers={this.state.parent.assignedUsers}
            handleSubmit={this.handleSubmit}
          />
          These tasks are assigned to:
          <ul>
            {this.state.parent.assignedUsers.map((value, index) => {
              return <li key={index}>{value.username}</li>;
            })}
          </ul>
          {this.state.subTodos.map((item, index) => {
            return (
              <SubList
                key={index}
                data={item}
                parent={this.state.parent}
                onCheck={this.onCheckHandler}
                onDelete={this.onRemoveSubTodo}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default Todo;
