import React, { Component } from "react";

import "../styles/FAB.css";

/**
 *
 *
 * @export
 * @class FAB
 * @extends {Component}
 */
export class FAB extends Component {
  render() {
    return (
      <button className="fab btn-add" onClick={this.props.onClick}></button>
    );
  }
}

export default FAB;
