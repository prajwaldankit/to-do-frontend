import React, { Component } from "react";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {}

  render() {
    console.log("object");
    return <>Profile</>;
  }
}
