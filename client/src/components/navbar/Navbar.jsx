import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Comp
import { FixedNavbar, NavList, NavListItem } from "./NavBar.style";
import { Container } from "../../theme/style";
import { ThemeProvider } from "styled-components";
import { color } from "../../theme/color";
import Modal from "../modal/Modal";
import AuthForm from "../form/authForm/AuthForm";
// actions
import { actOpenModal, actCloseModal } from "../../actions/modal";
import { actLogout } from "../../actions/auth";
// ulti
import isEmpty from "../../utils/isEmpty";

const NavBarContext = React.createContext({
  auth: {},
  actOpenModal: () => {},
  actLogout: () => {}
});
const NavBarConsumer = props => {
  return (
    <NavBarContext.Consumer>
      {contextVal => {
        if (!contextVal) {
          throw new Error(
            "NavBar compound components must be rendered in NavBar"
          );
        }
        return props.children(contextVal);
      }}
    </NavBarContext.Consumer>
  );
};
export class Navbar extends Component {
  static AuthNav = props => {
    return (
      <NavBarConsumer>
        {contextval =>
          !isEmpty(contextval.auth) ? (
            <React.Fragment>
              <NavListItem onClick={() => contextval.actOpenModal()}>
                {contextval.auth.name}
              </NavListItem>
              <NavListItem onClick={() => contextval.actLogout()}>
                <i className="fas fa-sign-out-alt" />
                Log out
              </NavListItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavListItem onClick={() => contextval.actOpenModal()}>
                <i className="fas fa-sign-in-alt" />
                Login
              </NavListItem>
              <NavListItem>
                <i className="fas fa-user-plus" />
                Sign up
              </NavListItem>
            </React.Fragment>
          )
        }
      </NavBarConsumer>
    );
  };

  static List = props => {
    return (
      <NavBarConsumer>
        {() => <NavList style={props.style}>{props.children}</NavList>}
      </NavBarConsumer>
    );
  };

  static Item = props => {
    return (
      <NavBarConsumer>
        {() => <NavListItem style={props.style}>{props.children}</NavListItem>}
      </NavBarConsumer>
    );
  };

  state = {
    actOpenModal: this.props.actOpenModal,
    actLogout: this.props.actLogout
  };

  render() {
    const { theme, auth, isModal } = this.props;
    return (
      <React.Fragment>
        {isModal && (
          <Modal>
            <AuthForm display="flex" />
          </Modal>
        )}
        <ThemeProvider theme={theme}>
          <FixedNavbar style={{ zIndex: "999" }}>
            <Container style={{ display: "flex", alignItems: "center" }}>
              <NavBarContext.Provider value={{ ...this.state, auth }}>
                {this.props.children}
              </NavBarContext.Provider>
            </Container>
          </FixedNavbar>
        </ThemeProvider>
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
  mapDispatchToProps
)(Navbar);
