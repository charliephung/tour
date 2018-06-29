import React, { Component } from "react";
import OverviewContent from "./OverviewContent";
import OverviewGuide from "./OverviewGuide";
import OverviewReview from "./OverviewReview";
import OverviewComment from "./OverviewComment";
import Test from "./Test";

export class Overview extends Component {
  constructor(props) {
    super(props);

    this.overview = React.createRef();
    this.overviewContent = React.createRef();
    this.test = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getPosition = () => {
    console.log(this.test.current.props.getDOMRect("test"));
    // TODO
    console.log(
      this.overviewContent.current.props.getDOMRect("overviewContent")
    );

    return {
      // overview: this.overviewContent.getPosition(),
      // guide: this.overviewGuide.getPosition(),
      // review: this.overviewReview.getPosition()
    };
  };
  render() {
    const { content, guide, rating, comments, totalReviews } = this.props;

    return (
      <section className="overview" ref={this.overview}>
        <Test ref={this.test} />
        {/* Text */}
        <OverviewContent text={content} ref={this.overviewContent} />
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
