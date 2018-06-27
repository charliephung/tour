import React from "react";
import { showRating } from "../../utils";

const OverviewReview = ({ totalReviews, rating }) => {
  return (
    <React.Fragment>
      <h3 className="heading-3 overview__review__totals">
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
};

export default OverviewReview;
