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
  const ui = React.Children.map(children, child => (
    <CSSTransition
      defaultStyle={{
        transform: transit("scaleY(0)")
      }}
      transitionAppear
      enterStyle={{ transform: transit("scaleY(1)", 200, "ease-in-out") }}
      leaveStyle={{
        transform: transit("translateX(-100%)", 200, "ease-in-out")
      }}
      activeStyle={{
        transform: transit("scaleY(1)")
      }}
    >
      {child}
    </CSSTransition>
  ));
  return <CSSTransitionGroup>{ui}</CSSTransitionGroup>;
};

export default DropTransitionGroup;
