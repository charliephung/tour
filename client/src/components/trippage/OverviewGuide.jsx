import React, { Component } from "react";
import { textToParagraph } from "../../utils";

export class OverviewGuide extends Component {
  constructor(props) {
    super(props);

    this.overviewGuide = React.createRef();
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  getPosition() {
    return this.overviewGuide.current.getBoundingClientRect().top;
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

export default OverviewGuide;
