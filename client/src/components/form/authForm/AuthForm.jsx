import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
// Comp
import { FormContainer, Input } from "./AuthForm.style";
import { Button } from "../../../theme/style";
import { color } from "../../../theme/color";
// Hoc
import DropTransitionGroup from "../../../HOComponent/DropTransitionGroup";
// actions

export class AuthForm extends Component {
  state = {
    showForm: true
  };

  onHideFormAndCloseModal = () => {
    this.props.actCloseModal();
    this.setState({
      showForm: false
    });
  };

  handleSubmitResult = result => {
    this.props.actGoogleLogin({
      accessToken: result.accessToken,
      userEmail: result.profileObj.email,
      username: result.profileObj.name,
      avatar: result.profileObj.imageUrl
    });
  };

  render() {
    return (
      <DropTransitionGroup>
        {this.state.showForm && (
          <FormContainer>
            <span
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.5rem",
                fontSize: "2rem",
                cursor: "pointer"
              }}
              onClick={this.onHideFormAndCloseModal}
            >
              X
            </span>
            <h1>Login</h1>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <p>Forgot Password?</p>
            <Button
              theme={{
                display: "block",
                width: "100%",
                bgColor: color.green
              }}
            >
              Log in (Coming soon).
              <br />
              Please use google instead
            </Button>
            <hr />
            <p style={{ textAlign: "center" }} className="paragraph">
              Or Login with google
            </p>
            <GoogleLogin
              clientId="597937938029-b2lu6sgeorlnido8nj17c043egimammo.apps.googleusercontent.com"
              buttonText="Login"
              style={{
                backgroundColor: "transparent",
                border: "none",
                focus: { outline: "none" },
                marginLeft: "auto",
                marginRight: "auto",
                display: "inherit"
              }}
              onSuccess={result => {
                this.handleSubmitResult(result);
              }}
              onFailure={() => {}}
            >
              <i
                style={{
                  color: "#e55f2e",
                  textAlign: "center",
                  display: "inherit",
                  cursor: "pointer"
                }}
                className="fab fa-google-plus fa-3x"
              />
            </GoogleLogin>
          </FormContainer>
        )}
      </DropTransitionGroup>
    );
  }
}

const mapStateToProps = state => ({ isModal: state.modal });

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(AuthForm);
