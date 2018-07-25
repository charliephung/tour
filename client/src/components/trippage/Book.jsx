import React, { Component } from "react";
import { connect } from "react-redux";
// ultis
import isEmpty from "../../utils/isEmpty";
// actions
import { actOpenModal } from "../../actions/modal";
import { actBook } from "../../actions/trip";
// comp
import { Input, FormGroup } from "../form/authForm/AuthForm.style";
import { Button } from "../../theme/style";
import { color } from "../../theme/color";

export const errorMessage = msg => {
  return <p style={{ fontSize: "1.5rem", color: "red" }}>{msg}</p>;
};

const absolute = {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: "0",
  left: "0",
  display: "flex",
  background: "rgba(247, 245, 245, 0.71)",
  justifyContent: "center",
  alignItems: "center"
};

export class Book extends Component {
  state = {
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    people: 1
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.actBook(this.props.params.tripId, this.state);
  };

  onChangePeople = e => {
    this.setState(state => {
      if (state.people + e >= 0 && state.people + e <= 10) {
        return { people: state.people + e };
      }
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { auth, loading, error, pricePerDay, pricePerPerson } = this.props;
    const { name, email, people, startDate, endDate } = this.state;

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
          <div style={absolute}>
            <h3
              onClick={() => this.props.actOpenModal()}
              style={{ fontSize: "3rem", cursor: "pointer" }}
            >
              Login to Book
            </h3>
          </div>
        )}
        {loading && (
          <div style={absolute}>
            <h3 style={{ fontSize: "3rem", cursor: "pointer" }}>Sending...</h3>
          </div>
        )}
        <div />
        <form onSubmit={this.onSubmit} style={{ fontSize: "1.6rem" }}>
          <h1 style={{ fontSize: "2.5rem", paddingBottom: "1rem" }}>Book</h1>
          <FormGroup>
            <Input
              placeholder="Full name"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
              inValid={error.name}
            />
            {error.name && errorMessage(error.name)}
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
              inValid={error.email}
            />
            {error.email && errorMessage(error.email)}
          </FormGroup>
          <FormGroup>
            <label htmlFor="start-date">Start Date</label>
            <Input
              id="start-date"
              type="date"
              onChange={this.onChange}
              name="startDate"
              value={startDate}
              inValid={error.startDate}
            />
            {error.startDate && errorMessage(error.startDate)}
          </FormGroup>
          <FormGroup>
            <label htmlFor="end-date">End Date</label>
            <Input
              id="end-date"
              type="date"
              onChange={this.onChange}
              name="endDate"
              value={endDate}
              inValid={error.endDate}
            />
            {error.endDate && errorMessage(error.endDate)}
          </FormGroup>
          <FormGroup>
            <label htmlFor="people">People</label>
            <div>
              <Input
                type="text"
                onChange={() => {}}
                name="people"
                value={people}
                inValid={error.people}
              />
              {error.people && errorMessage(error.people)}
              <Button
                type="button"
                style={{ fontSize: "2rem", color: "black" }}
                onClick={() => this.onChangePeople(1)}
              >
                +
              </Button>
              <Button
                type="button"
                style={{ fontSize: "2rem", color: "black" }}
                onClick={() => this.onChangePeople(-1)}
              >
                -
              </Button>
            </div>
          </FormGroup>
          <h3 className="heading-3">
            Total: ${pricePerDay + pricePerPerson * people}
          </h3>
          <Button theme={{ bgColor: color.orange, width: "100%" }}>Book</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  loading: state.loading.bookingIsLoading
});

const mapDispatchToProps = {
  actOpenModal,
  actBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
