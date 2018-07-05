import React, { Component } from "react";

export class Overview extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  arrToObj = arr => {
    const newObj = arr.reduce((obj, ele) => {
      obj[ele.name] = ele.ref;
      return obj;
    }, {});

    return newObj;
  };

  getChildrenOffset = () => {
    const offSet = this.props.children.map((ele, index) => {
      try {
        return {
          ref: {
            offsetHeight: ele.ref.current.ref.current.offsetHeight,
            offsetLeft: ele.ref.current.ref.current.offsetLeft,
            offsetTop: ele.ref.current.ref.current.offsetTop,
            offsetWidth: ele.ref.current.ref.current.offsetWidth
          },
          name: ele.type.name
        };
      } catch (error) {
        return {
          ref: null,
          name: ele.type.name
        };
      }
    });
    const offSetObj = this.arrToObj(offSet);
    return offSetObj;
  };
  getChildrenPosition = () => {
    const positions = this.props.children.map((ele, index) => {
      try {
        return {
          ref: ele.ref.current.ref.current.getBoundingClientRect(),
          name: ele.type.name
        };
      } catch (error) {
        return {
          ref: null,
          name: ele.type.name
        };
      }
    });
    const positionsObj = this.arrToObj(positions);
    return positionsObj;
  };

  render() {
    return (
      <section className="overview" ref={this.overview}>
        {this.props.children}
      </section>
    );
  }
}

export default Overview;
