import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import PriorityIcon from "./../components/PriorityIcon";
import "../styles/ListItem.css";

/**
 *
 *
 * @export
 * @class ListItem
 * @extends {Component}
 */
export class ListItem extends Component {
  dateParser(date) {
    return "Created at: " + date.slice(4, 24);
  }

  render() {
    let checkItem = this.props.data.checked ? (
      <i className="fas fa-check-circle" onClick={this.props.onCheck}></i>
    ) : (
      <i className="far fa-check-circle" onClick={this.props.onCheck}></i>
    );

    let deleteIcon = (
      <button className="btn-delete" onClick={this.props.onDelete}></button>
    );
    let editIcon = (
      <i className="fas fa-pen edit-icon" onClick={this.props.onEdit}></i>
    );
    let checked = this.props.data.checked ? "checked" : "not-checked";

    return (
      <div className="list-item">
        <Card>
          <Card.Body className={checked}>
            <Card.Title>{this.props.data.title}</Card.Title>
            <Card.Text>{this.props.data.content}</Card.Text>

            <div className="todo-tools">
              {!(this.props.data.subTodos.length > 0) ? checkItem : <> </>}
              {editIcon}
              {deleteIcon}
              <button
                onClick={e => this.props.onAddSubList(this.props.data._id)}
              >
                Add
              </button>
              {this.props.data.subTodos.length > 0 ? (
                <Link
                  to={{
                    pathname: `/todo/${this.props.data._id}`,
                    state: {
                      parent: this.props.data,
                      userData: this.props.userData
                    }
                  }}
                >
                  <button className="btn btn-success">open</button>
                </Link>
              ) : (
                <> </>
              )}
              <PriorityIcon priority={this.props.data.priority} />
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            {`${this.dateParser(this.props.data.createdAt)} by ${
              this.props.data.author.username
            } to ${this.props.data.assignedTo.username}`}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default ListItem;
