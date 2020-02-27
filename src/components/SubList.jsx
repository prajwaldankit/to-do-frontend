import React, { Component } from "react";
import { Card } from "react-bootstrap";

import PriorityIcon from "./PriorityIcon";

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
    this.loadStateFromProps();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadStateFromProps();
    }
  }

  loadStateFromProps() {
    this.setState({
      subTodo: this.props.data
    });
  }

  render() {
    let checkItem = (
      <button className="btn">
        {this.props.data.checked ? (
          <i className="fas fa-check-circle " onClick={this.props.onCheck}></i>
        ) : (
          <i className="far fa-check-circle " onClick={this.props.onCheck}></i>
        )}
      </button>
    );

    let deleteIcon = (
      <button className="btn btn-delete" onClick={this.props.onDelete}>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button>
    );
    let editIcon = (
      <button className="btn">
        <i
          className="fas fa-pen edit-icon fa-lg"
          onClick={this.props.onEdit}
        ></i>
      </button>
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
              <PriorityIcon priority={this.state.subTodo.priority} />
            </div>
            Assigned To:
            {this.state.subTodo.assignedTo ? (
              `${this.state.subTodo.assignedTo.username}`
            ) : (
              <> Loading... </>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SubList;
