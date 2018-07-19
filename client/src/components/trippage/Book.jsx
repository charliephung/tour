import React, { Component } from "react";
import { connect } from "react-redux";
// ultis
import isEmpty from "../../utils/isEmpty";
// actions
import { actOpenModal } from "../../actions/modal";
// comp
import { Input, FormGroup } from "../form/authForm/AuthForm.style";
import { Button } from "../../theme/style";
import { color } from "../../theme/color";

export class Book extends Component {
  constructor(props) {
    super(props);

    this.bookForm = React.createRef();
  }

  render() {
    const { auth } = this.props;
    return (
      <div
        style={{
          padding: "1rem 2rem",
          boxShadow: "rgba(0, 0, 0, 0.3) 0rem 0.1rem 1rem",
          position: "relative",
          width: "fit-content"
        }}
      >
        {isEmpty(auth) && (
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              display: "flex",
              background: "rgba(247, 245, 245, 0.71)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3
              onClick={() => this.props.actOpenModal()}
              style={{ fontSize: "3rem", cursor: "pointer" }}
            >
              Login to Book
            </h3>
          </div>
        )}
        <div />
        <form style={{ fontSize: "1.6rem" }}>
          <h1 style={{ fontSize: "2.5rem", paddingBottom: "1rem" }}>Book</h1>
          <FormGroup>
            <Input placeholder="Full name" type="text" />
          </FormGroup>
          <FormGroup>
            <Input placeholder="Email" type="email" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="start-date">Start Date</label>
            <Input id="start-date" type="date" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="end-date">End Date</label>
            <Input id="end-date" type="date" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="people">People</label>
            <div>
              <Input type="text" />
              <Button
                type="button"
                style={{ fontSize: "2rem", color: "black" }}
              >
                +
              </Button>
              <Button
                type="button"
                style={{ fontSize: "2rem", color: "black" }}
              >
                -
              </Button>
            </div>
          </FormGroup>
          <h3 className="heading-3">Total: $85</h3>
          <Button theme={{ bgColor: color.orange, width: "100%" }}>Book</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  actOpenModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
