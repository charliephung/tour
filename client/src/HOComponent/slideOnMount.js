import React, { Component } from "react";
import "./slide.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const withSlideOnMount = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <WrappedComponent {...this.props} />
        </ReactCSSTransitionGroup>
      );
    }
  };
};
export default withSlideOnMount;
