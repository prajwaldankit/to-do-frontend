import React, { Component } from "react";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";

import "../styles/AddTodo.css";
import "./../styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 *
 *
 * @export
 * @class AddTodo
 * @extends {Component}
 */
class SubList extends Component {
  constructor() {
    super();
    this.state = {
      subTodo: {}
    };
  }

  componentDidMount() {
    this.setState({
      subTodo: this.props.data
    });
  }

  render() {
    let checkItem = this.props.data.checked ? (
      <i
        className="fas fa-check-circle"
        onClick={e => this.props.onCheck(this.state.subTodo)}
      ></i>
    ) : (
      <i
        className="far fa-check-circle"
        onClick={e => this.props.onCheck(this.state.subTodo)}
      ></i>
    );

    let deleteIcon = (
      <button
        className="btn-delete"
        onClick={e =>
          this.props.onDelete(this.props.parent._id, this.state.subTodo)
        }
      ></button>
    );
    let editIcon = (
      <i className="fas fa-pen edit-icon" onClick={this.props.onEdit}></i>
    );
    let checked = this.props.data.checked ? "checked" : "not-checked";
    return (
      <div className="list-item">
        <Card>
          <Card.Body className={checked}>
            <Card.Title>{this.state.subTodo.title}</Card.Title>
            <Card.Text>{this.state.subTodo.content}</Card.Text>
            <div className="todo-tools">
              {checkItem}
              {editIcon}
              {deleteIcon}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SubList;
