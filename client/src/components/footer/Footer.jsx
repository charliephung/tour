import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__list">
        <li className="footer__item">Company</li>
        <li className="footer__item">Contact us</li>
        <li className="footer__item">Carrers</li>
        <li className="footer__item">Privacy Policy</li>
        <li className="footer__item">Terms</li>
      </ul>
      <ul className="footer__list">
        <li className="footer__item">
          <i className="fab fa-facebook-square" />
        </li>
        <li className="footer__item">
          <i className="fab fa-instagram" />
        </li>
        <li className="footer__item">
          <i className="fab fa-twitter-square" />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
