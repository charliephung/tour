import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { FlexModal } from "./Modal.style";

const modalRoot = document.getElementById("modal");
const body = document.getElementsByTagName("body");

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.modal = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.modal);
    body[0].style.overflow = "hidden";
    window.sro;
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modal);
    body[0].style.overflow = "scroll";
  }

  render() {
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <FlexModal>{this.props.children}</FlexModal>,
      // A DOM element
      this.modal
    );
  }
}

const mapStateToProps = state => ({
  isModal: state.modal
});

export default compose(connect(mapStateToProps))(Modal);
