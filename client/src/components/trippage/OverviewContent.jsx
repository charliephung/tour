import React from "react";
import { textToParagraph } from "../../utils";

const OverviewContent = ({ text }) => {
  return (
    <div className="overview__text">
      <h3 className="heading-3">Overview</h3>
      {textToParagraph(text)}
    </div>
  );
};

export default OverviewContent;
