import React from "react";

const OverviewNavListItem = ({ value, title, active, onClick }) => {
  return (
    <li
      value={value}
      onClick={onClick}
      className={`overview__list-item ${active && "active"}`}
    >
      {title}
    </li>
  );
};

export default OverviewNavListItem;
