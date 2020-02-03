import React, { Component } from "react";
import "../styles/FAB.css";

export class FAB extends Component {
  render() {
    return (
      <div className="fab" onClick={this.props.onClick}>
        <i className="fas fa-plus add-todo-icon"></i>
      </div>
    );
  }
}

export default FAB;
