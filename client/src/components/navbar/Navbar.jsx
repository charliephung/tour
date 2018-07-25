import React, { Component } from "react";
import { connect } from "react-redux";
// Comp
import { NavList, NavListItem, Nav } from "./NavBar.style";
import { Container } from "../../theme/style";
// actions
import { actOpenModal } from "../../actions/modal";
import { actLogout, actGoogleLogin } from "../../actions/auth";
// ulti
import isEmpty from "../../utils/isEmpty";

const NavBarContext = React.createContext({
  auth: {},
  actOpenModal: () => {},
  actLogout: () => {},
  actGoogleLogin: () => {}
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

  static List = ({ theme, children, ...props }) => {
    return (
      <NavBarConsumer>
        {value => {
          const propsTheme = {
            ...value.theme,
            ...theme
          };
          return (
            <NavList theme={propsTheme} {...props} style={props.style}>
              {children}
            </NavList>
          );
        }}
      </NavBarConsumer>
    );
  };

  static Item = ({ theme, children, active, ...props }) => {
    return (
      <NavBarConsumer>
        {value => {
          const propsTheme = {
            ...value.theme,
            ...theme
          };
          const activeIndex =
            active === undefined || active === false ? false : true;
          return (
            <NavListItem
              theme={propsTheme}
              active={activeIndex}
              {...props}
              style={props.style}
            >
              {children}
            </NavListItem>
          );
        }}
      </NavBarConsumer>
    );
  };

  state = {
    actOpenModal: this.props.actOpenModal,
    actLogout: this.props.actLogout
  };

  render() {
    const { theme, auth, children, ...rest } = this.props;

    return (
      <React.Fragment>
        <Nav theme={theme}>
          <Container theme={theme}>
            <NavBarContext.Provider
              value={{ ...this.state, auth, theme, ...rest }}
            >
              {children}
            </NavBarContext.Provider>
          </Container>
        </Nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ isModal: state.modal, auth: state.auth });
const mapDispatchToProps = {
  actOpenModal,
  actLogout,
  actGoogleLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Navbar);
