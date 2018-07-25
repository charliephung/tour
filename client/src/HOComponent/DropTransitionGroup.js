import React from "react";
import {
  CSSTransition,
  CSSTransitionGroup,
  transit
} from "react-css-transition";

CSSTransition.childContextTypes = {
  //child context keys
};

const DropTransitionGroup = ({ children }) => {
  const ui = React.Children.map(children, (child, index) => (
    <CSSTransition
      defaultStyle={{
        transform: "scaleY(0)"
      }}
      enterStyle={{ transform: transit("scaleY(1)", 200, "ease-in-out") }}
      leaveStyle={{
        transform: transit("scaleY(0)", 200, "ease-in-out")
      }}
      activeStyle={{
        transform: "scaleY(1)"
      }}
    >
      {child}
    </CSSTransition>
  ));
  return <CSSTransitionGroup transitionAppear={true}>{ui}</CSSTransitionGroup>;
};

export default DropTransitionGroup;
