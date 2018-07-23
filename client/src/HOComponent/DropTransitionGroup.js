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
  return (
    <CSSTransitionGroup>
      {React.Children.map(children, child => (
        <CSSTransition
          defaultStyle={{
            transform: transit("scaleY(0)", 200, "ease-in-out")
          }}
          enterStyle={{ transform: transit("scaleY(1)", 200, "ease-in-out") }}
          leaveStyle={{ transform: transit("scaleY(0)", 200, "ease-in-out") }}
          activeStyle={{ transform: transit("scaleY(1)", 200, "ease-in-out") }}
        >
          {child}
        </CSSTransition>
      ))}
    </CSSTransitionGroup>
  );
};

export default DropTransitionGroup;
