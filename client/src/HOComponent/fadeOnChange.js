import React, { Component } from "react";
import "./fade.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const withFadeOnChange = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={3000}
        >
          <WrappedComponent />
        </ReactCSSTransitionGroup>
      );
    }
  };
};
export default withFadeOnChange;
