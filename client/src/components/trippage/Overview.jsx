import React, { Component } from "react";
import { textToParagraph, showRating } from "../../utils";

const UserComment = ({ userImageUrl, username, date, text }) => {
  if (!text) {
    return (
      <div style={{ padding: "2rem 0", fontSize: "1.6rem" }}>
        <h3 style={{ fontSize: "2.5rem" }}>Comment </h3>
        <p>No comment yet</p>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div>
        <div>
          <figure>
            <img src={userImageUrl} alt={username} />
          </figure>
          <div>
            <p>{username}</p>
            <p>{date}</p>
          </div>
        </div>
        <div>
          <div>{textToParagraph(text)}</div>
        </div>
      </div>
      <hr />
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

const Review = ({ totalReviews, rating }) => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <h3 style={{ fontSize: "2.5rem" }}>Review</h3>
      <div style={{ display: "flex", fontSize: "2rem" }}>
        <ul style={{ display: "flex" }}>{showRating(rating)}</ul>
        <span style={{ padding: "0 .5rem" }}>
          {!rating ? "No rating yet" : rating}
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
