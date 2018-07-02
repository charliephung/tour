import React, { Component } from "react";
import { textToParagraph } from "../../utils";
import withRef from "../../HOComponent/withRef";

export class OverviewGuide extends Component {
  constructor(props) {
    super(props);

    this.overviewGuide = React.createRef();
  }

  render() {
    const { text } = this.props;
    return (
      <div className="overview__guide" ref={this.overviewGuide}>
        <h3 className="heading-3">Guide</h3>
        {textToParagraph(text)}
      </div>
    );
  }
}

export default withRef(OverviewGuide);
