import React from "react";

const showImage = images => {
  if (!images) {
    return null;
  }
  if (images && images.length > 7) {
    images.splice(7);
  }
  let result = [];
  result = images.map((ele, index) => (
    <div className={`gallery__item gallery__item--${index + 1}`}>
      <img
        className="gallery__photo"
        src={ele.imageUrl}
        alt={`image ${index}`}
      />
    </div>
  ));

  return result;
};

const Gallery = ({ images }) => {
  return (
    <section className="gallery">
      <h3 className="heading-3 ">Gallery</h3>
      {showImage(images)}
    </section>
  );
};

export default Gallery;
