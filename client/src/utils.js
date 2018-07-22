import React from "react";

export const textToParagraph = text => {
  let result = null;
  if (!text) {
    return result;
  }
  let paragraphs = text.split("\n");
  paragraphs = paragraphs.filter(ele => ele.length > 0);

  result = paragraphs.map((ele, index) => (
    <p key={index} style={{ paddingBottom: "1rem" }}>
      {ele}
    </p>
  ));

  return result;
};

export const showRating = (rating, onClick) => {
  let result = [];
  for (let i = 0; i < 5; i++) {
    result.push(
      <li style={{ cursor: "pointer" }} onClick={() => onClick(i + 1)} key={i}>
        <i className="far fa-star" />
      </li>
    );
  }

  for (let i = 0; i < rating; i++) {
    result[i] = (
      <li style={{ cursor: "pointer" }} onClick={() => onClick(i + 1)} key={i}>
        <i className="fas fa-star" />
      </li>
    );
  }

  return result;
};
