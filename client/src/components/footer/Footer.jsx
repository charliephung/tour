import React from "react";
import { Row, Container } from "../../theme/style";
import { color } from "../../theme/color";

const Footer = () => {
  return (
    <Row theme={{ background: color.darkGrey }}>
      <Container>
        <ul
          style={{
            display: "flex",
            fontSize: "2.5rem",
            justifyContent: "space-evenly",
            color: "white"
          }}
        >
          <li>Company</li>
          <li>Contact us</li>
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
        <ul
          style={{
            display: "flex",
            fontSize: "4rem",
            justifyContent: "center",
            color: "white"
          }}
        >
          <li>
            <i className="fab fa-facebook-square" />
          </li>
          <li>
            <i className="fab fa-instagram" />
          </li>
          <li>
            <i className="fab fa-twitter-square" />
          </li>
        </ul>
      </Container>
    </Row>
  );
};
export default Footer;
