import React, { Component } from "react";
import "./fade.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const withFadeOnMout = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionEnter={true}
          transitionLeave={true}
        >
          <WrappedComponent {...this.props} />
        </ReactCSSTransitionGroup>
      );
    }
  };
};
export default withFadeOnMout;
