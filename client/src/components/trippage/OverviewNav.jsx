import React, { Component } from "react";

export class OverviewNav extends Component {
  static Item = ({ value, active, onClick, children }) => (
    <li
      value={value}
      onClick={() => onClick(value)}
      className={`overview__list-item ${active && "active"}`}
    >
      {children}
    </li>
  );
  render() {
    const activeIndex = this.props.active;
    const propsChildren = React.Children.map(
      this.props.children,
      (child, index) =>
        React.cloneElement(child, {
          onClick: this.props.onClick,
          value: index,
          active: activeIndex === index
        })
    );
    return (
      <section style={this.props.style} className="overview">
        <div className="overview__nav">
          <ul className="overview__list">{propsChildren}</ul>
        </div>
      </section>
    );
  }
}

export default OverviewNav;
