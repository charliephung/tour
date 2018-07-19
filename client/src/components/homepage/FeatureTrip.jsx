import React from "react";
import { showRating } from "../../utils";
import { Card } from "./Card.Style";

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
    <Card>
      <div
        style={{
          backgroundPosition: "center",
          width: "100%",
          height: "400px",
          backgroundImage: `url(${headerImageUrl})`
        }}
      />
      {/* <img style={{ height: "400px",  }} src={headerImageUrl} alt={title} /> */}
      <h4>{title}</h4>
      <p>From {pricePerDay + pricePerPerson}$</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ul style={{ display: "flex" }}>{showRating(rating)}</ul>
        <p>
          {reviews.length <= 1
            ? `${reviews.length} review
            `
            : `${reviews.length} reviews`}
        </p>
      </div>
    </Card>
  );
};

export default FeatureTrip;
