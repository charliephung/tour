import React from "react";

const withRef = WrappedComponent => {
  class WithRef extends React.Component {
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
    const getPosition = name => {
      try {
        return {
          offsetHeight: ref.current[name].current.offsetTop
        };
      } catch (error) {
        return null;
      }
    };

    return (
      <WithRef
        {...props}
        getDOMRect={getDOMRect}
        getPosition={getPosition}
        forwardedRef={ref}
      />
    );
  });
};

export default withRef;
