import React, { Component } from "react";
import { connect } from "react-redux";
import { FormContainer } from "./AuthForm.style";
import { compose } from "redux";
import DropTransitionGroup from "../../../HOComponent/DropTransitionGroup";
// actions
import { actOpenModal, actCloseModal } from "../../../actions/modal";

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

  render() {
    return (
      <DropTransitionGroup>
        {this.state.showForm && (
          <FormContainer>
            <h1 onClick={this.onHideFormAndCloseModal}>Hi</h1>
          </FormContainer>
        )}
      </DropTransitionGroup>
    );
  }
}

const mapStateToProps = state => ({ isModal: state.modal });
const mapDispatchToProps = {
  actOpenModal,
  actCloseModal
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AuthForm);
