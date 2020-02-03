import React, { Component } from "react";

export class Todo extends Component {
  todos = "";
  constructor() {
    super();
    this.todos = this.props.data;
  }
  render() {
    return <div className="remaining-tabs">{this.props.data}</div>;
  }
}

export default Todo;
