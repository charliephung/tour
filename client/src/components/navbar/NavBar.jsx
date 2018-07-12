import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// actions
import { actOpenModal, actCloseModal } from "../../actions/modal";
import { actLogout } from "../../actions/auth";
import Modal from "../modal/Modal";
import AuthForm from "../form/authForm/AuthForm";
// ulti
import isEmpty from "../../utils/isEmpty";

export class NavBar extends Component {
  render() {
    const {
      navStyle,
      navListStyle,
      isModal,
      actOpenModal,
      actCloseModal,
      actLogout,
      auth
    } = this.props;

    const authNav = (
      <ul className="navbar__list navbar--right">
        <li onClick={() => actOpenModal()} className="navbar__item">
          {auth.name}
        </li>
        <li onClick={() => actLogout()} className="navbar__item">
          <i className="fas fa-sign-out-alt" />
          Log out
        </li>
      </ul>
    );

    const unauthNav = (
      <ul className="navbar__list navbar--right">
        <li onClick={() => actOpenModal()} className="navbar__item">
          <i className="fas fa-sign-in-alt" />
          Login
        </li>
        <li className="navbar__item">
          <i className="fas fa-user-plus" />
          Sign up
        </li>
      </ul>
    );

    return (
      <React.Fragment>
        {isModal && (
          <Modal>
            <AuthForm display="flex" />
          </Modal>
        )}
        <nav ref="node" className="navbar" style={navStyle}>
          <div className="navbar__component" style={navListStyle}>
            <ul className="navbar__list">
              <li className="navbar__item">
                <Link to="/">Tour</Link>
              </li>
              <li className="navbar__item">Blog</li>
            </ul>
            {!isEmpty(auth) ? authNav : unauthNav}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ isModal: state.modal, auth: state.auth });
const mapDispatchToProps = {
  actOpenModal,
  actCloseModal,
  actLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(NavBar);
