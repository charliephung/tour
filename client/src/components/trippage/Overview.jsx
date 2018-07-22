import React, { Component } from "react";
import { textToParagraph, showRating } from "../../utils";

const UserComment = props => {
  const { date, userId, text } = props.comments;
  return (
    <React.Fragment>
      <div>
        <div style={{ display: "flex" }}>
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
              justifyContent: "center"
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

const Review = ({ rating }) => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <h3 style={{ fontSize: "2.5rem" }}>Review</h3>
      <div style={{ display: "flex", fontSize: "2rem" }}>
        <ul style={{ display: "flex" }}>{showRating(rating.length)}</ul>
        <span style={{ padding: "0 .5rem" }}>
          {!rating ? "No rating yet" : rating.length}
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
