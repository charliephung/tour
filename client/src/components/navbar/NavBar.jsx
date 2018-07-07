import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// actions
import { actOpenModal, actCloseModal } from "../../actions/modal";
import Modal from "../modal/Modal";
import AuthForm from "../form/authForm/AuthForm";

const NavBar = ({
  navStyle,
  navListStyle,
  isModal,
  actOpenModal,
  actCloseModal
}) => {
  return (
    <React.Fragment>
      {isModal && (
        <Modal>
          <AuthForm display="flex" />
        </Modal>
      )}
      <nav className="navbar" style={navStyle}>
        <div className="navbar__component" style={navListStyle}>
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to="/">Tour</Link>
            </li>
            <li className="navbar__item">Blog</li>
          </ul>
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
        </div>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({ isModal: state.modal });
const mapDispatchToProps = {
  actOpenModal,
  actCloseModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
