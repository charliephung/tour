import React from "react";

const Header = props => {
  return (
    <header className="header">
      {props.children && props.headerImage && props.children(props.headerImage)}
      <h1 className="header__heading heading-1">Experience in unknow</h1>
      <button className="btn">Experience trip</button>
    </header>
  );
};

export default Header;
