import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import routes from "./routes";
// actions
import { actCloseModal } from "./actions/modal";
import { actGoogleLogin } from "./actions/auth";
// Comp
import Modal from "./components/modal/Modal";
import AuthForm from "./components/form/authForm/AuthForm";

class App extends Component {
  showRoutes = routes => {
    let result = [];
    result = routes.map((ele, index) => (
      <Route
        key={index}
        exact={ele.exact}
        path={ele.path}
        component={ele.main}
      />
    ));
    // Switch case routes
    return <Switch>{result}</Switch>;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isModal && (
          <Modal>
            <AuthForm
              actCloseModal={this.props.actCloseModal}
              actGoogleLogin={this.props.actGoogleLogin}
              display="flex"
            />
          </Modal>
        )}
        <Router>{this.showRoutes(routes)}</Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isModal: state.modal
});
const mapDispatchToProps = {
  actGoogleLogin,
  actCloseModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
