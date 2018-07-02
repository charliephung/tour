import React, { Component } from "react";
import OverviewContent from "./OverviewContent";
import OverviewGuide from "./OverviewGuide";
import OverviewReview from "./OverviewReview";
import OverviewComment from "./OverviewComment";
import withRef from "../../HOComponent/withRef";

export class Overview extends Component {
  constructor(props) {
    super(props);

    this.overview = React.createRef();
    this.overviewContent = React.createRef();
    this.overviewGuide = React.createRef();
    this.overviewReview = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getChildDOMRect = () => {
    return {
      overview: this.overviewContent.current.props.getDOMRect(
        "overviewContent"
      ),
      guide: this.overviewGuide.current.props.getDOMRect("overviewGuide"),
      review: this.overviewReview.current.props.getDOMRect("overviewReview")
    };
  };

  getChildPosition = () => {
    return {
      overview: this.overviewContent.current.props.getPosition(
        "overviewContent"
      ),
      guide: this.overviewGuide.current.props.getPosition("overviewGuide"),
      review: this.overviewReview.current.props.getPosition("overviewReview")
    };
  };

  render() {
    const { content, guide, rating, comments, totalReviews } = this.props;

    return (
      <section className="overview" ref={this.overview}>
        {/* Text */}
        <OverviewContent text={content} ref={this.overviewContent} />
        <hr />
        {/* Guide */}
        <OverviewGuide text={guide} ref={this.overviewGuide} />
        <hr />
        {/* Review */}
        <div className="overview__review mb-md">
          <OverviewReview
            totalReviews={totalReviews}
            rating={rating}
            ref={this.overviewReview}
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

export default withRef(Overview);
