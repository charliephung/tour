import React, { Component } from "react";

const showImage = images => {
  if (!images) {
    return <p>No images</p>;
  }
  if (images && images.length > 7) {
    images.splice(7);
  }
  let result = [];
  result = images.map((ele, index) => (
    <div key={index} className={`gallery__item gallery__item--${index + 1}`}>
      <img className="gallery__photo" src={ele.imageUrl} alt={`${index}`} />
    </div>
  ));

  return result;
};

const OverviewGallery = ({ images }) => {
  return (
    <section style={{ fontSize: "1.6rem" }}>
      <h3 style={{ fontSize: "2.5rem" }}>Gallery</h3>
      {showImage(images)}
    </section>
  );
};

export default OverviewGallery;
