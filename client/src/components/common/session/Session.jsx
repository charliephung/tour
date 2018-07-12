import React, { Component, Children } from "react";
import * as Scroll from "react-scroll/modules";

const Flag = props => {
  if (props.displayName) {
    this.displayName = props.displayName;
  }
  return <div ref={props.node} />;
};

const onAnimatedScroll = (offsetHeight, duration = 500) => {
  Scroll.animateScroll.scrollTo(offsetHeight, {
    duration
  });
};

export class Session extends Component {
  static Flag = Flag;
  flagsNode = {};

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  getFlagsPosition = () => {
    if (Object.keys(this.flagsNode).length === 0) return {};
    const flagPositions = Object.entries(this.flagsNode).reduce(
      (obj, [key, value]) => {
        obj[key] = value.current.getBoundingClientRect();
        return obj;
      },
      {}
    );
    return flagPositions;
  };
  getFlagsOffSet = () => {
    if (Object.keys(this.flagsNode).length === 0) return {};
    return Object.entries(this.flagsNode).reduce((obj, [key, value]) => {
      obj[key] = {
        offsetHeight: value.current.offsetHeight,
        offsetLeft: value.current.offsetLeft,
        offsetTop: value.current.offsetTop,
        offsetWidth: value.current.offsetWidth
      };

      return obj;
    }, {});
  };

  scrollToFlag = (flag, top = 0, duration) => {
    try {
      onAnimatedScroll(this.getFlagsOffSet()[flag].offsetTop - top, duration);
      return;
    } catch (error) {
      return null;
    }
  };

  inViewFlag = () => {
    const flags = this.getFlagsPosition();
    const flagTop = Object.values(flags).map((ele, index) => Math.abs(ele.top));
    const indexOfMin = flagTop.indexOf(Math.min(...flagTop));
    return Object.keys(flags).find(
      ele => Math.abs(flags[ele].top) === flagTop[indexOfMin]
    );
  };

  render() {
    return React.Children.map(this.props.children, (child, index) => {
      if (child.type.name === "Flag") {
        return React.cloneElement(child, {
          node: (this.flagsNode[
            child.props.displayName || index
          ] = React.createRef())
        });
      }
      return React.cloneElement(child);
    });
  }
}

export default Session;
