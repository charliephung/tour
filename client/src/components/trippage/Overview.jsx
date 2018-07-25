import React, { Component } from "react";
import { textToParagraph, showRating } from "../../utils";
import isEmpty from "../../utils/isEmpty";
import { Button } from "../../theme/style";

const UserComment = props => {
  const { auth, onClick, loading } = props;
  const { date, userId, text, _id } = props.comments;

  let deleteButton = null;
  if (!isEmpty(auth)) {
    deleteButton =
      auth.id === userId._id ? (
        <Button onClick={() => onClick(_id)} btnSm danger>
          {loading ? "......" : "Delete"}
        </Button>
      ) : null;
  }

  return (
    <React.Fragment>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <figure>
            <img
              style={{
                borderRadius: "50%",
                marginRight: "15px",
                height: "50px"
              }}
              src={userId.avatar}
              alt={userId.name}
            />
          </figure>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: "10px"
            }}
          >
            <p
              style={{
                fontSize: "1.9rem",
                fontWeight: "bold"
              }}
            >
              {userId.name}
            </p>
            <p
              style={{
                fontSize: "1.2rem"
              }}
            >
              {date}
            </p>
          </div>
          {deleteButton}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div style={{ fontSize: "1.6rem" }}>{textToParagraph(text)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Content = props => (
  <div style={{ padding: "2rem 0", fontSize: "1.6rem", lineHeight: "1.5" }}>
    <h3 style={{ fontSize: "2.5rem" }}>{props.title}</h3>
    <br />
    {textToParagraph(props.text)}
  </div>
);

const Review = ({ rating, onClick }) => {
  const rate = rating.map(ele => ele.rate);
  let avgRate = Math.ceil(rate.reduce((a, b) => a + b, 0) / rate.length);
  avgRate = isNaN(avgRate) ? 0 : avgRate;

  return (
    <div style={{ padding: "2rem 0" }}>
      <h3 style={{ fontSize: "2.5rem" }}>Review</h3>
      <div style={{ display: "flex", fontSize: "2rem" }}>
        <ul style={{ display: "flex" }}> {showRating(avgRate, onClick)}</ul>
        <span style={{ padding: "0 .5rem" }}>
          {!rating ? "No rating yet" : `${avgRate} - ${rating.length} reviews`}
        </span>
      </div>
    </div>
  );
};

export class Overview extends Component {
  static Content = Content;
  static Comment = UserComment;
  static Review = Review;

  render() {
    return <section>{this.props.children}</section>;
  }
}

export default Overview;
