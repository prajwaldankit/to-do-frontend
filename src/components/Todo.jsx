import React, { Component } from "react";
import { toast } from "react-toastify";

import Header from "../components/Header";
import SubList from "../components/SubList";
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
      parent: {},
      taskStatus: "false",
      subTodos: [],
      todoTitle: "",
      todoContent: "",
      userData: {}
    };
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.onRemoveSubTodo = this.onRemoveSubTodo.bind(this);
  }

  componentWillMount() {
    this.setState({
      parent: this.props.location.state.parent,
      taskStatus: this.props.location.state.parent.checked,
      userData: this.props.location.state.userData
    });
  }

  componentDidMount() {
    this.getSubTodos();
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

  onTodoTitleChanged(event) {
    this.setState({
      todoTitle: event.target.value
    });
  }

  onTodoContentChanged(event) {
    this.setState({
      todoContent: event.target.value
    });
  }

  handleSubmit(event) {
    if (this.state.todoTitle === "") {
      toast.error("Todo title cannot be empty");
    } else {
      event.preventDefault();
      todoServices
        .addSubToDoItem(this.props.location.state.parent._id, {
          title: this.state.todoTitle,
          content: this.state.todoContent
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
          handleLogOut={this.handleLogOut}
          userData={this.state.userData}
        />
        <div className="remaining-tabs">
          <h1>{this.state.parent.title}</h1>
          <h2>Status: {this.state.taskStatus ? "Completed" : "Remaining"}</h2>
          <PriorityIcon priority={this.state.parent.priority} />
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.todoTitle}
              onChange={e => this.onTodoTitleChanged(e)}
            />
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              id="content"
              value={this.state.todoContent}
              onChange={e => this.onTodoContentChanged(e)}
            />
            <button type="submit" onClick={e => this.handleSubmit(e)}>
              Add
            </button>
          </form>
          {this.state.subTodos.map((item, index) => {
            return (
              <SubList
                key={item._id}
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
