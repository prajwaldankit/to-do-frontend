import React, { Component } from "react";
import "../styles/ListItem.css";
import { Card } from "react-bootstrap";

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
      <i
        className="fas fa-trash-alt delete-icon"
        onClick={this.props.onDelete}
      ></i>
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
              {checkItem}
              {editIcon}
              {deleteIcon}
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            {this.dateParser(this.props.data.createdAt)}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default ListItem;
