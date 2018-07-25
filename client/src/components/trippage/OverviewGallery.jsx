import React from "react";

const showImage = images => {
  if (!images) {
    return <p>No images</p>;
  }
  if (images && images.length > 7) {
    images.splice(7);
  }
  let result = [];
  result = images.map((ele, index) => (
    <div style={{ padding: "1rem", width: "400px" }} key={index}>
      <img style={{ width: "100%" }} src={ele} alt={`${index}`} />
    </div>
  ));

  return result;
};

const OverviewGallery = ({ images }) => {
  return (
    <section style={{ fontSize: "1.6rem", padding: "2rem 0" }}>
      <h3 style={{ fontSize: "2.5rem" }}>Gallery</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {showImage(images)}
      </div>
    </section>
  );
};

export default OverviewGallery;
