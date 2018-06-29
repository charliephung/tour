import React, { Component } from "react";
import withRef from "../../HOComponent/withRef";

export class Test extends Component {
  constructor(props) {
    super(props);
    this.test = React.createRef();
  }
  render() {
    return (
      <div ref={this.test} className="overview__guide">
        <h3 className="heading-3">TEST</h3>
        Hi
      </div>
    );
  }
}

export default withRef(Test);
