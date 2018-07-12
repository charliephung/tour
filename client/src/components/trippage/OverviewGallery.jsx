import React, { Component } from "react";

const showImage = images => {
  if (!images) {
    return null;
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

export class OverviewGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <section className="gallery" ref={this.props.node}>
        <h3 className="heading-3 ">Gallery</h3>
        {showImage(images)}
      </section>
    );
  }
}

export default OverviewGallery;
