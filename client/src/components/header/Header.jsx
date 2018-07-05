import React, { Component } from "react";
import PropTypes from "prop-types";

export class Header extends Component {
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
    const { heading, button } = this.props;

    return (
      <header className="header">
        {this.props.children(this.props.headerImage, this.state.activeIndex)}
        <h1 className="header__heading heading-1">
          {heading ? heading : "Experience in unknow"}
        </h1>
        {button && <button className="btn">Experience trip</button>}
      </header>
    );
  }
}

export default Header;
