import React from "react";
import { showRating } from "../../utils";

const FeatureTrip = ({
  imageUrl,
  heading,
  fromPrice,
  rating,
  totalReviews
}) => {
  return (
    <div className="feature-trip__card">
      <img src={imageUrl} alt={heading} />
      <h4 className="feature-trip__heading">{heading}</h4>
      <p className="feature-trip__price">From {fromPrice}$</p>
      <div className="feature-trip__rate">
        <ul className="star">{showRating(rating)}</ul>
        <p>
          {totalReviews <= 1
            ? `${totalReviews} review
        `
            : `${totalReviews} reviews`}
        </p>
      </div>
    </div>
  );
};

export default FeatureTrip;
