import React from "react";

const OverviewNav = ({ children }) => {
  return (
    <section ref={this.overviewNav} className="overview">
      <div className="overview__nav">
        <ul className="overview__list">{children}</ul>
      </div>
    </section>
  );
};

export default OverviewNav;
