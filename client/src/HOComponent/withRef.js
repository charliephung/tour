import React from "react";

const withRef = WrappedComponent => {
  class WithRef extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    const getDOMRect = name => {
      try {
        return ref.current[name].current.getBoundingClientRect();
      } catch (error) {
        return null;
      }
    };

    return <WithRef {...props} getDOMRect={getDOMRect} forwardedRef={ref} />;
  });
};

export default withRef;
