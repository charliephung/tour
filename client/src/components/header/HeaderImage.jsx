import React from "react";

const HeaderImage = ({ imageUrl, active }) => {
  return (
    <div
      className="header__image"
      style={{
        transition: "2s opacity",
        opacity: active ? "1" : "0",
        backgroundImage: `linear-gradient(rgba(20, 30, 48, 0.6), rgba(36, 59, 85, 0.6)), url(${imageUrl}`
      }}
    />
  );
};

export default HeaderImage;
