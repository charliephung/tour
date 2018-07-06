import React, { Component } from "react";
import "./slide.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const withDropOnMout = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="slide"
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
export default withDropOnMout;
