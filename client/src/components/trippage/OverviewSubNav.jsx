import React from "react";

const OverviewSubNav = ({
  overviewNavStyle,
  overviewNavListStyle,
  viewingContent,
  onScrollToSession
}) => {
  return (
    <div className="overview__nav" style={overviewNavStyle}>
      <ul className="overview__list" style={overviewNavListStyle}>
        <li
          value="0"
          onClick={onScrollToSession}
          className={`overview__list-item ${viewingContent === "overview" &&
            "active"}`}
        >
          Overview
        </li>
        <li
          value="1"
          onClick={onScrollToSession}
          className={`overview__list-item ${viewingContent === "guide" &&
            "active"}`}
        >
          Guide
        </li>
        <li
          value="2"
          onClick={onScrollToSession}
          className={`overview__list-item ${viewingContent === "review" &&
            "active"}`}
        >
          Review
        </li>
        <li
          value="3"
          onClick={onScrollToSession}
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
