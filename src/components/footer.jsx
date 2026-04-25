import React, { Component } from "react";

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {
      name: "by Ammar Mohamed",
    };
  }
  render() {
    return <footer className="text-center p-2">{this.state.name}</footer>;
  }
}
