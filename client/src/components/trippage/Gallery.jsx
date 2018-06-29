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
      <img
        className="gallery__photo"
        src={ele.imageUrl}
        alt={`image ${index}`}
      />
    </div>
  ));

  return result;
};

export class Gallery extends Component {
  constructor(props) {
    super(props);

    this.gallery = React.createRef();
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  getPosition() {
    return this.gallery.current.getBoundingClientRect().top;
  }
  render() {
    const { images } = this.props;
    return (
      <section className="gallery" ref={this.gallery}>
        <h3 className="heading-3 ">Gallery</h3>
        {showImage(images)}
      </section>
    );
  }
}

export default Gallery;
