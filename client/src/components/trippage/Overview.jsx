import React, { Component } from "react";
import { textToParagraph } from "../../utils";

export class Overview extends Component {
  static Content = props => (
    <div className="overview__text">
      <h3 className="heading-3">{props.title}</h3>
      {textToParagraph(props.text)}
    </div>
  );

  render() {
    return <section className="overview">{this.props.children}</section>;
  }
}

export default Overview;
