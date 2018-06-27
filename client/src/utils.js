import React from "react";

export const textToParagraph = text => {
  let result = null;
  if (!text) {
    return result;
  }
  let paragraphs = text.split("\n");
  paragraphs = paragraphs.filter(ele => ele.length > 0);

  result = paragraphs.map((ele, index) => (
    <p key={index} className="paragraph">
      {ele}
    </p>
  ));

  return result;
};

export const showRating = rating => {
  let result = [];
  for (let i = 0; i < 5; i++) {
    result.push(
      <li key={i} className="star__icon">
        <i className="far fa-star" />
      </li>
    );
  }

  for (let i = 0; i < rating; i++) {
    result[i] = (
      <li key={i} className="star__icon">
        <i className="fas fa-star" />
      </li>
    );
  }

  return result;
};
