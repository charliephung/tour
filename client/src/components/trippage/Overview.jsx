import React from "react";
import OverviewContent from "./OverviewContent";
import OverviewGuide from "./OverviewGuide";
import OverviewReview from "./OverviewReview";
import OverviewComment from "./OverviewComment";

const Overview = ({ content, guide, rating, comments, totalReviews }) => {
  return (
    <section className="overview">
      {/* Text */}
      <OverviewContent text={content} />
      <hr />
      {/* Guide */}
      <OverviewGuide text={guide} />
      <hr />
      {/* Review */}
      <div className="overview__review mb-md">
        <OverviewReview totalReviews={totalReviews} rating={rating} />
        {/* Comments */}
        {comments.map((ele, index) => <OverviewComment key={index} {...ele} />)}
      </div>
      {/* Show more reviews */}
      <button className="btn mb-md btn--grey">Show more</button>
    </section>
  );
};

export default Overview;
