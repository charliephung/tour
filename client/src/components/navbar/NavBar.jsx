import React from "react";
import { Link } from "react-router-dom";
import "./test.css";

const NavBar = ({ navStyle, navListStyle }) => {
  return (
    <nav className="navbar" style={navStyle}>
      <div className="navbar__component" style={navListStyle}>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/">Tour</Link>
          </li>
          <li className="navbar__item">Blog</li>
        </ul>
        <ul className="navbar__list navbar--right">
          <li className="navbar__item">
            <a href="tour.html">
              <i className="fas fa-sign-in-alt" />
              Login
            </a>
          </li>
          <li className="navbar__item">
            <i className="fas fa-user-plus" />
            Sign up
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
