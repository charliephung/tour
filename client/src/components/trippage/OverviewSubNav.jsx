import React from "react";

const OverviewSubNav = ({
  overviewNavStyle,
  overviewNavListStyle,
  viewingContent
}) => {
  console.log(viewingContent);

  return (
    <div className="overview__nav" style={overviewNavStyle}>
      <ul className="overview__list" style={overviewNavListStyle}>
        <li
          className={`overview__list-item ${viewingContent === "overview" &&
            "active"}`}
        >
          Overview
        </li>
        <li
          className={`overview__list-item ${viewingContent === "guide" &&
            "active"}`}
        >
          Guide
        </li>
        <li
          className={`overview__list-item ${viewingContent === "review" &&
            "active"}`}
        >
          Review
        </li>
        <li
          className={`overview__list-item ${viewingContent === "gallery" &&
            "active"}`}
        >
          Gallery
        </li>
      </ul>
    </div>
  );
};

export default OverviewSubNav;
