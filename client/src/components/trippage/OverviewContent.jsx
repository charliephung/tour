import React, { Component } from "react";
import { textToParagraph } from "../../utils";
import withRef from "../../HOComponent/withRef";

export class OverviewContent extends Component {
  constructor(props) {
    super(props);
    this.overviewContent = React.createRef();
  }
  render() {
    const { text } = this.props;
    return (
      <div className="overview__text" ref={this.overviewContent}>
        <h3 className="heading-3">Overview</h3>
        {textToParagraph(text)}
      </div>
    );
  }
}

export default withRef(OverviewContent);
