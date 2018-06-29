import React, { Component } from "react";
import { showRating } from "../../utils";

export class OverviewReview extends Component {
  constructor(props) {
    super(props);

    this.overviewReview = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  getPosition() {
    return this.overviewReview.current.getBoundingClientRect().top;
  }
  render() {
    const { totalReviews, rating } = this.props;
    return (
      <React.Fragment>
        <h3
          className="heading-3 overview__review__totals"
          ref={this.overviewReview}
        >
          {totalReviews <= 1
            ? `${totalReviews} review`
            : `${totalReviews} reviews`}
        </h3>
        <div className="overview__review__rating">
          <span>{rating}</span>
          <ul className="star">{showRating(rating)}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default OverviewReview;
