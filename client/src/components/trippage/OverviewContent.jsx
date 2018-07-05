import React, { Component } from "react";
import { textToParagraph } from "../../utils";

export class OverviewContent extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    const { text } = this.props;
    return (
      <div className="overview__text" ref={this.ref}>
        <h3 className="heading-3">Overview</h3>
        {textToParagraph(text)}
      </div>
    );
  }
}

export default OverviewContent;
