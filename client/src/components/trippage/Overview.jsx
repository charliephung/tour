import React, { Component } from "react";
import OverviewContent from "./OverviewContent";
import OverviewGuide from "./OverviewGuide";
import OverviewReview from "./OverviewReview";
import OverviewComment from "./OverviewComment";

export class Overview extends Component {
  constructor(props) {
    super(props);

    this.overview = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getPosition = () => {
    return {
      overview: this.overviewContent.getPosition(),
      guide: this.overviewGuide.getPosition(),
      review: this.overviewReview.getPosition()
    };
  };
  render() {
    const { content, guide, rating, comments, totalReviews } = this.props;
    return (
      <section className="overview" ref={this.overview}>
        {/* Text */}
        <OverviewContent
          text={content}
          onRef={ref => (this.overviewContent = ref)}
        />
        <hr />
        {/* Guide */}
        <OverviewGuide text={guide} onRef={ref => (this.overviewGuide = ref)} />
        <hr />
        {/* Review */}
        <div className="overview__review mb-md">
          <OverviewReview
            totalReviews={totalReviews}
            rating={rating}
            onRef={ref => (this.overviewReview = ref)}
          />
          {/* Comments */}
          {comments.map((ele, index) => (
            <OverviewComment key={index} {...ele} />
          ))}
        </div>
        {/* Show more reviews */}
        <button className="btn mb-md btn--grey">Show more</button>
      </section>
    );
  }
}

export default Overview;
