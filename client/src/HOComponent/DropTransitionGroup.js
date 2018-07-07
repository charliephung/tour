import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./drop.css";

const DropTransitionGroup = ({ children }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="drop"
      transitionAppear={true}
      transitionAppearTimeout={0}
      transitionEnter={false}
      transitionLeaveTimeout={0}
    >
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default DropTransitionGroup;
