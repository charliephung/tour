import React from "react";
import { textToParagraph } from "../../utils";

const Comment = ({ userImageUrl, username, date, text }) => {
  return (
    <React.Fragment>
      <div className="comments">
        <div className="comments__top">
          <figure className="comments__user__avatar">
            <img src={userImageUrl} alt={username} />
          </figure>
          <div className="comments__user">
            <p className="comments__user__name">{username}</p>
            <p className="comments__user__date">{date}</p>
          </div>
        </div>
        <div className="comments__bot">
          <div className="comments__user__text">{textToParagraph(text)}</div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Comment;
