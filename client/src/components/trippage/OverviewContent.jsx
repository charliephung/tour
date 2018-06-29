import React, { Component } from "react";
import { textToParagraph } from "../../utils";

export class OverviewContent extends Component {
  constructor(props) {
    super(props);

    this.overviewContent = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  getPosition() {
    return this.overviewContent.current.getBoundingClientRect().top;
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

export default OverviewContent;
