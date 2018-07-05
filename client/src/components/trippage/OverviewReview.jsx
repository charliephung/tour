import React, { Component } from "react";
import { showRating } from "../../utils";

export class OverviewReview extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { totalReviews, rating } = this.props;
    return (
      <React.Fragment>
        <h3 className="heading-3 overview__review__totals" ref={this.ref}>
          {!totalReviews
            ? "0 review"
            : totalReviews === 1
              ? `${totalReviews} review`
              : `${totalReviews} reviews`}
        </h3>
        <div className="overview__review__rating">
          <span>{!rating ? 0 : rating}</span>
          <ul className="star">{showRating(rating)}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default OverviewReview;
