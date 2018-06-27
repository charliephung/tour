import React from "react";
import { textToParagraph } from "../../utils";

const OverviewGuide = ({ text }) => {
  return (
    <div className="overview__guide">
      <h3 className="heading-3">Guide</h3>
      {textToParagraph(text)}
    </div>
  );
};

export default OverviewGuide;
