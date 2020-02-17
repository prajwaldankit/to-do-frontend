import React, { Component } from "react";
import { toast } from "react-toastify";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

import "../styles/AddTodo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/reset.css";
import { addToDoItem } from "../services/todo";

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
      todoTitle: "",
      todoContent: ""
    };
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
      addToDoItem({
        title: this.state.todoTitle,
        content: this.state.todoContent
      })
        .then(response => {
          if (response.status === 200) {
            toast.success("Todo Added Successfully");
            this.props.handleClose();
            this.props.reloadList();
          } else {
            toast.error("Some error occured. Please try again later.");
          }
        })
        .catch(err => {
          toast.error(err);
        });
    }
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
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
