import React from "react";
import withSlideOnMount from "../../HOComponent/slideOnMount";

const HeaderImage = ({ imageUrl }) => {
  return (
    <div
      className="header__image"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 30, 48, 0.6), rgba(36, 59, 85, 0.6)), url(${imageUrl}`
      }}
    />
  );
};

export default withSlideOnMount(HeaderImage);
