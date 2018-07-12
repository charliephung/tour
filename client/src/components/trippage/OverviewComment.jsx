import React, { Component } from "react";
import { textToParagraph } from "../../utils";

export class OverviewComment extends Component {
  render() {
    const { userImageUrl, username, date, text } = this.props;
    if (!text) {
      return (
        <div className="comments" ref={this.props.node}>
          <div className="comments__bot">
            <div className="comments__user__text">No Comment yet</div>
            <br />
            <br />
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="comments" ref={this.props.node}>
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
  }
}

export default OverviewComment;
