import React from "react";
import { showRating } from "../../utils";

const FeatureTrip = props => {
  const {
    headerImageUrl,
    title,
    pricePerDay,
    pricePerPerson,
    rating,
    reviews
  } = props.trip;

  return (
    <div className="feature-trip__card">
      <img src={headerImageUrl} alt={title} />
      <h4 className="feature-trip__heading">{title}</h4>
      <p className="feature-trip__price">
        From {pricePerDay + pricePerPerson}$
      </p>
      <div className="feature-trip__rate">
        <ul className="star">{showRating(rating)}</ul>
        <p>
          {reviews.length <= 1
            ? `${reviews.length} review
        `
            : `${reviews.length} reviews`}
        </p>
      </div>
    </div>
  );
};

export default FeatureTrip;
