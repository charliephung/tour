import React, { Component } from "react";
import { FormContainer } from "./AuthForm.style";
import withDropOnMout from "../../../HOComponent/fadeOnMount";

export class AuthForm extends Component {
  render() {
    return (
      <FormContainer>
        <h1>Hi</h1>
      </FormContainer>
    );
  }
}

export default withDropOnMout(AuthForm);
