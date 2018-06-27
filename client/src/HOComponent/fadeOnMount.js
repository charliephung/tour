import React, { Component } from "react";
import "./fade.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const withFadeOnMout = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={700}
          transitionEnter={false}
          transitionLeave={false}
        >
          <WrappedComponent {...this.props} />
        </ReactCSSTransitionGroup>
      );
    }
  };
};
export default withFadeOnMout;
