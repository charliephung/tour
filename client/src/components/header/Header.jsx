import React, { Component } from "react";
import PropTypes from "prop-types";
// Comp
import { FluidHeader } from "./Header.style";

const HeaderImage = props => {
  return (
    <div
      style={{
        zIndex: -1,
        position: "absolute",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "74vh",
        width: "100%",
        transition: "2s opacity",
        opacity: props.active ? "1" : "0",
        backgroundImage: `linear-gradient(rgba(20, 30, 48, 0.6), rgba(36, 59, 85, 0.6)), url(${
          props.imageUrl
        }`
      }}
    />
  );
};

const Heading = props => {
  return (
    <h1
      style={{
        zIndex: "100",
        fontSize: "6rem",
        color: "#fff",
        margin: "10% 0",
        textShadow: "1px 10px 10px rgba(0,0,0, .5)"
      }}
    >
      {props.children}
    </h1>
  );
};

export class Header extends Component {
  static Image = props => {
    return <HeaderImage {...props} />;
  };
  static Heading = props => {
    return <Heading {...props} />;
  };

  state = {
    activeIndex: 0
  };
  static propTypes = {
    headerImage: PropTypes.array,
    button: PropTypes.bool
  };
  static defaultProps = {
    button: true
  };

  componentDidMount() {
    // Change header image
    if (this.props.headerImage && this.props.headerImage.length > 1) {
      this.interval = setInterval(() => {
        this.setState({
          activeIndex:
            (this.state.activeIndex + 1) % this.props.headerImage.length
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <FluidHeader>
        {this.props.renderImage(this.props.headerImage, this.state.activeIndex)}
        {this.props.children}
      </FluidHeader>
    );
  }
}

export default Header;
